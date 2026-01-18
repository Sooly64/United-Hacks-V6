import json

# Load the sample profile data
with open('results/profile.json', 'r') as f:
    sample_data = json.load(f)

print("Sample profile data loaded:")
print(f"Name: {sample_data[0]['profile'].get('name', 'N/A')}")
print(f"Job Title: {sample_data[0]['profile'].get('jobTitle', 'N/A')}")
print(f"Location: {sample_data[0]['profile'].get('address', {}).get('addressLocality', 'N/A')}")
