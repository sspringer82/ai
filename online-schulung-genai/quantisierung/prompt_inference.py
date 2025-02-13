#pip install torch transformers

import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

# Modell und Tokenizer laden
model_name = 'distilbert-base-uncased'
tokenizer = DistilBertTokenizer.from_pretrained(model_name)

# Quantisiertes Modell laden
quantized_model = DistilBertForSequenceClassification.from_pretrained(model_name)
quantized_model = torch.quantization.quantize_dynamic(
    quantized_model, {torch.nn.Linear}, dtype=torch.qint8
)

# Funktion zur Verarbeitung des Prompts
def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors='pt')
    with torch.no_grad():
        outputs = quantized_model(**inputs)
    logits = outputs.logits
    predicted_class_id = logits.argmax().item()
    return predicted_class_id

if __name__ == "__main__":
    prompt = input("Bitte geben Sie Ihren Prompt ein: ")
    response = generate_response(prompt)
    print(f"Modellantwort: {response}")