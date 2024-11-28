from datetime import date

def get_current_season():
    today = date.today()
    month = today.month
    day = today.day

    if (month == 12 and day >= 21) or (1 <= month <= 2) or (month == 3 and day < 20):
        return "Winter"
    elif (month == 3 and day >= 20) or (4 <= month <= 5) or (month == 6 and day < 21):
        return "Spring"
    elif (month == 6 and day >= 21) or (7 <= month <= 8) or (month == 9 and day < 22):
        return "Summer"
    elif (month == 9 and day >= 22) or (10 <= month <= 11) or (month == 12 and day < 21):
        return "Autumn"
    else:
        return "Unknown"

def generate_openai_message(user, activity, feeling):
    # Extract clothing items from user's wardrobe
    clothes = user.clothes.all()
    season = get_current_season()
    
    # Create system prompt by combining name and color of all clothes
    clothes_info = []
    for cloth in clothes:
        clothes_info.append(f"Clothes name:{cloth.name},Type: {cloth.category},Color: {cloth.color},id:{cloth.id};")
    system_prompt = (
        f"You are a virtual closet assistant providing personalized outfit suggestions based on the user's "
        f"wardrobe and current context. The user has the following clothes in their wardrobe: "
        + ", ".join(clothes_info) + ". "
       
    )
    
    # Create user prompt combining activity and feeling
    user_prompt = (
        f"The user currently want a feeling of {feeling} and need a outfit for the activity of {activity} today. Current season is {season}."
        f"Use this information to recommend a suitable outfit considering the user's feeling preference, activity, and available clothes."
        f"Recommendations should be composed of clothes that the user already has and the response should contain clothes id and category."
        f"Please give a reason in one sentence."
    )
    
    # Construct the OpenAI API message
    message = [{
        "role": "system",
        "content": system_prompt
    }, {
        "role": "user",
        "content": user_prompt
    }]
    
    return message

