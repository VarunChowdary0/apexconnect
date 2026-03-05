import imaplib
import email

mail = imaplib.IMAP4_SSL('imap.gmail.com')
mail.login("apexconnect40@gmail.com", "ndch royt nrdy iara")
mail.select("inbox")

status, messages = mail.search(None, 'ALL')

print(messages)
for num in messages[0].split():
    status, data = mail.fetch(num, '(RFC822)')
    msg = email.message_from_bytes(data[0][1])
    print("Subject:", msg["subject"])
    print("From:", msg["from"])
    print("To:", msg["to"])
    print("Date:", msg["date"])
    
    # print("Body:", msg.get_payload(decode=True).decode('utf-8'))