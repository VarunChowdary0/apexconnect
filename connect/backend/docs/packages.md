# 1. smtplib
# 2. email
## MIME (Multipurpose Internet Mail Extensions)
An internet standard that extends the basic email format to support more than just plain English text.

When using Python to send emails, you use the `email.mime` library to "build" these complex messages. Common classes include:
- MIMEMultipart: A container for emails that have both text and attachments.
- MIMEText: For the body of the email (either plain or html).
- MIMEImage / MIMEAudio: Specifically for attaching media files.
- MIMEBase: A general class used for other types of attachments like PDFs or ZIP files.
---
# 3. google-api-python-client
# 4. google-auth