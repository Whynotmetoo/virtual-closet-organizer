from PIL import Image
import clip
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device)

def get_image_color(image_path):
    image = Image.open(image_path)
    image_input = preprocess(image).unsqueeze(0).to(device)

    color_labels = ["red", "blue", "green", "yellow", "black", "white", "pink", "purple", "brown", "gray", "orange", "beige", "teal", "navy", "maroon", "olive", "cyan", "magenta", "lime", "gold", "silver", "bronze", "cream", "ivory", "lavender", "turquoise", "indigo", "peach", "coral", "amber", "mint", "burgundy", "charcoal", "aqua", "mustard", "tan", "plum", "sapphire", "emerald", "ruby", "pearl", "ochre"]
    text_inputs = torch.cat([clip.tokenize(f"a {color}") for color in color_labels]).to(device)

    with torch.no_grad():
        text_features = model.encode_text(text_inputs)

    with torch.no_grad():
        image_features = model.encode_image(image_input)

    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)
    similarity = (image_features @ text_features.T)

    best_color_idx = similarity.argmax()
    best_color = color_labels[best_color_idx]

    return best_color
        