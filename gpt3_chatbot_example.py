import openai_secret_manager

# Authenticate using the API key
secrets = openai_secret_manager.get_secret("openai")
print(secrets)

import openai
openai.api_key = secrets["api_key"]

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

# Example usage
prompt = "I am planning to travel to Japan next month, what should I know before I go?"
response = generate_response(prompt)
print(response)
