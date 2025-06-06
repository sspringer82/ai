import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

model_name = 'distilbert-base-uncased'

# Tokenizer laden
tokenizer = DistilBertTokenizer.from_pretrained(model_name)

# Vortrainiertes Modell laden
model = DistilBertForSequenceClassification.from_pretrained(model_name)

# Dynamische Quantisierung anwenden
quantized_model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

torch.save(quantized_model.state_dict(), 'quantized_distilbert.pth')
torch.save(model.state_dict(), 'distilbert.pth')