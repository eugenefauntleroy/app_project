import openai_secret_manager
import openai
import zendesk

# Authenticate using the API key
secrets = openai_secret_manager.get_secret("openai")
openai.api_key = secrets["api_key"]

# Zendesk authentication
zendesk_secrets = openai_secret_manager.get_secret("zendesk")
client = zendesk.client.Client(**zendesk_secrets)

# Use the GPT-3 model to generate a response
def generate_response(prompt):
    completions = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    message = completions.choices[0].text
    return message.strip()

# Message a human Zendesk assistance if the question is not answered
def message_zendesk_assistance(prompt):
    response = generate_response(prompt)
    if response == "I'm sorry, I'm not sure how to help with that.":
        ticket = zendesk.ticket.Ticket(client)
        ticket.create(
            subject="Unanswered question",
            comment={"body": f"The following question was not answered by the chatbot:
