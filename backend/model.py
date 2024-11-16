# model.py
import sys
import json

# Example function: Multiply a number by 2
def model(input_data):
    number = input_data.get("number")
    return {"result": number * 2}

if __name__ == "__main__":
    # Read input from stdin
    input_json = sys.stdin.read()
    input_data = json.loads(input_json)
    
    # Process data with the model
    output_data = model(input_data)
    
    # Print the output as JSON
    print(json.dumps(output_data))
