from flask import Flask, redirect, request, jsonify
import os
import json
from dotenv import load_dotenv
import msal
from datetime import datetime

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '.env'))

app = Flask(__name__)
app.secret_key = os.urandom(24)

CLIENT_ID = os.getenv('CLIENT_ID', '').strip()
CLIENT_SECRET = os.getenv('CLIENT_SECRET', '').strip()
TENANT_ID = os.getenv('TENANT_ID', '').strip()
AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
REDIRECT_URI = "http://localhost:2211/callback"
SCOPES = ["User.Read", "Mail.Read", "Mail.Send"]
TOKEN_FILE = os.path.join(os.path.dirname(__file__), "token.json")


def _build_msal_app():
    return msal.ConfidentialClientApplication(
        CLIENT_ID,
        authority=AUTHORITY,
        client_credential=CLIENT_SECRET,
    )


@app.route('/login')
def login():
    """Redirect user to Microsoft OAuth login page."""
    msal_app = _build_msal_app()
    auth_url = msal_app.get_authorization_request_url(
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
    )
    return redirect(auth_url)


@app.route('/callback')
def callback():
    """Handle OAuth callback — exchange auth code for tokens."""
    if "error" in request.args:
        return jsonify({
            "success": False,
            "error": request.args.get("error"),
            "description": request.args.get("error_description"),
        }), 400

    code = request.args.get("code")
    if not code:
        return jsonify({"success": False, "error": "No authorization code received"}), 400

    msal_app = _build_msal_app()
    result = msal_app.acquire_token_by_authorization_code(
        code,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
    )

    if "error" in result:
        print(f"[TOKEN ERROR] {result.get('error')}: {result.get('error_description')}")

    if "access_token" in result:
        token = result["access_token"]
        print(f"[{datetime.now().isoformat()}] Access Token: {token[:50]}...")

        # Save token to file for use in graphAPI.ipynb
        token_data = {
            "access_token": token,
            "refresh_token": result.get("refresh_token"),
            "expires_in": result.get("expires_in"),
            "token_type": result.get("token_type"),
        }
        with open(TOKEN_FILE, "w") as f:
            json.dump(token_data, f, indent=2)
        print(f"[{datetime.now().isoformat()}] Token saved to {TOKEN_FILE}")

        return jsonify({"success": True, **token_data})

    return jsonify({
        "success": False,
        "error": result.get("error"),
        "description": result.get("error_description"),
    }), 401


if __name__ == '__main__':
    app.run(port=2211, debug=True)
