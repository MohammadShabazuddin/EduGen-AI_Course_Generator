/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hours, NoOf Chapters: 5, in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Python Programming Fundamentals",\n    "description": "This course provides a comprehensive introduction to Python programming for beginners. You will learn the fundamental concepts of programming, including variables, data types, operators, control flow, functions, and modules. By the end of this course, you will be able to write basic Python programs and solve simple programming problems.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "This chapter covers the basics of Python, including its history, syntax, and how to set up your development environment.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Variables and Data Types",\n        "about": "Learn about different data types in Python such as integers, floats, strings, and booleans. You\'ll also understand how to assign values to variables and perform basic operations on them.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Operators and Expressions",\n        "about": "Explore various operators like arithmetic, comparison, and logical operators. You\'ll learn how to build expressions and evaluate them to make decisions in your programs.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Control Flow Statements",\n        "about": "Discover conditional statements like \'if-else\' and loops like \'for\' and \'while\' to control the flow of execution in your code. These statements allow you to create programs that can respond to different scenarios and repeat actions.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Functions and Modules",\n        "about": "Learn how to define your own functions to organize and reuse code. You\'ll also be introduced to the concept of modules and how to import them to extend the functionality of your programs.",\n        "duration": "20 minutes"\n      }\n    ],\n    "category": "Programming",\n    "topic": "Python",\n    "level": "Basic",\n    "duration": "1 hour",\n    "noOfChapters": 5\n  }\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Python Basic, Chapter: Variables and Data Types, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example (Code field in <precode> format) if applicable\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "What are Variables?",\n    "explanation": "Variables are like containers that store data in your Python programs. You give them names, and they hold specific information, such as numbers, text, or even more complex data structures.",\n    "code": "<precode>\\n# Assigning a value to a variable named \'age\'\\nage = 25\\n\\n# Printing the value of the \'age\' variable\\nprint(age)\\n</precode>"\n  },\n  {\n    "title": "Variable Naming Rules",\n    "explanation": "Python has rules for naming variables to make your code readable and avoid errors:\\n\\n* **Start with a letter or underscore:**  `name`, `_age`, `my_variable` are valid.\\n* **Use letters, numbers, and underscores:**  `score1`, `_count`, `total_amount` are allowed.\\n* **Case-sensitive:** `age` and `Age` are different variables.\\n* **Avoid reserved keywords:** Python has words like `if`, `for`, `while` that have special meanings; don\'t use them as variable names.",\n    "code": ""\n  },\n  {\n    "title": "Data Types",\n    "explanation": "Python automatically determines the type of data you store in a variable. Here are some common data types:\\n\\n* **Integer (int):** Whole numbers (e.g., 10, -5, 0)\\n* **Float (float):** Numbers with decimal points (e.g., 3.14, -2.5, 0.0)\\n* **String (str):** Text enclosed in single or double quotes (e.g., \'hello\', \\"Python\\")\\n* **Boolean (bool):** Represents truth values (True or False)",\n    "code": "<precode>\\n# Integer\\nnumber = 10\\n\\n# Float\\npi = 3.14159\\n\\n# String\\ngreeting = \\"Hello, world!\\"\\n\\n# Boolean\\nis_active = True\\n</precode>"\n  },\n  {\n    "title": "Data Type Conversion",\n    "explanation": "You can change a variable\'s data type using built-in functions:\\n\\n* **`int()`:** Converts to an integer\\n* **`float()`:** Converts to a float\\n* **`str()`:** Converts to a string\\n* **`bool()`:** Converts to a boolean",\n    "code": "<precode>\\n# Converting a string to an integer\\nnumber_string = \'15\'\\nnumber = int(number_string)\\nprint(number)  # Output: 15\\n\\n# Converting a float to a string\\nprice = 12.99\\nprice_str = str(price)\\nprint(price_str)  # Output: \'12.99\'\\n</precode>"\n  },\n  {\n    "title": "Operations on Variables",\n    "explanation": "You can perform operations on variables depending on their data types:\\n\\n* **Arithmetic operators:**  `+`, `-`, `*`, `/`, `%` (modulo), `**` (exponent)\\n* **Comparison operators:**  `==`, `!=`, `<`, `>`, `<=`, `>=`\\n* **Logical operators:**  `and`, `or`, `not`",\n    "code": "<precode>\\n# Arithmetic\\nnum1 = 10\\nnum2 = 5\\nsum = num1 + num2\\nprint(sum)  # Output: 15\\n\\n# Comparison\\nage = 20\\nis_adult = age >= 18\\nprint(is_adult)  # Output: True\\n\\n# Logical\\nis_raining = True\\nis_sunny = False\\nis_nice_weather = is_raining and is_sunny\\nprint(is_nice_weather)  # Output: False\\n</precode>"\n  },\n  {\n    "title": "Variable Scope",\n    "explanation": "The scope of a variable determines where it can be accessed in your program.\\n\\n* **Global scope:** Variables declared outside any function are accessible anywhere in the program.\\n* **Local scope:** Variables declared inside a function are only accessible within that function.",\n    "code": "<precode>\\n# Global variable\\nglobal_var = \'Hello\'\\n\\ndef my_function():\\n    # Local variable\\n    local_var = \'World\'\\n    print(global_var, local_var)  # Output: Hello World\\n\\nmy_function()\\n\\n# Trying to access local_var outside the function will cause an error\\n# print(local_var) # Error: name \'local_var\' is not defined\\n</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});
