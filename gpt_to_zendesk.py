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
        engine="text-davinci-002", # the GPT-3 model to use
        prompt=prompt, # the prompt to generate a response to
        max_tokens=1024, # the maximum number of tokens to generate
        n=1, # the number of responses to generate
        stop=None, # a string or list of strings to stop generating tokens at
        temperature=0.5, # the sampling temperature to use
    )

    message = completions.choices[0].text
    return message.strip()

# Message a human Zendesk assistance if the question is not answered
def message_zendesk_assistance(prompt):
    response = generate_response(prompt)
    if response == "I'm sorry, I'm not sure how to help with that.":
        # create a new ticket in Zendesk
        ticket = zendesk.ticket.Ticket(client)
        ticket.create(
            subject="Unanswered question",
            comment={"body": f"The following question was not answered by the chatbot:\n\n{prompt}"},
            )
    else:
        return response

# test the function
print(message_zendesk_assistance("What's the best way to get to the Statue of Liberty?"))