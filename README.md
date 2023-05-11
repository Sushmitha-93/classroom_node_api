# Mood Sensing App Backend

This is a Fast API project with the following file structure:
### Project File Structure
```bash
.
├── app/
│   ├── .env
│   ├── main.py
│   ├── api/
│   │   ├── router.py
│   │   ├── __init__.py
│   │   ├── auth/
│   │   │   ├── auth.py
│   │   │   ├── user_deps.py
│   │   │   └── __init__.py
│   │   └── handlers/
│   │       ├── closest_happy_place.py
│   │       ├── user.py
│   │       ├── user_mood.py
│   │       └── __init__.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── __init__.py
│   ├── models/
│   │   ├── userModel.py
│   │   ├── usermood_model.py
│   │   └── __init__.py
│   ├── schemas/
│   │   ├── auth_schema.py
│   │   ├── usermood_schema.py
│   │   ├── userSchema.py
│   │   └── __init__.py
│   └── services/
│       ├── usermood_service.py
│       ├── userService.py
│       └── __init__.py
├── tests/
│   ├── conftest.py
│   ├── util.py
│   └── __init__.py/
│       └── routes/
│           ├── test_auth.py
│           ├── test_closestHappyPlace.py
│           ├── test_login.py
│           ├── test_root.py
│           ├── test_signup.py
│           ├── test_usermood_add.py
│           └── __init__.py
├── Dockerfile
├── pytest.ini
└── requirements.txt
```
## Project Structure

The `app/` directory contains the main files and directories for your Fast API application.
- `.env` file: This file is used for environment variables and configuration settings.
- `main.py`: This is the main entry point for your Fast API application.
- `api/` directory: It contains the API-related files and directories.
  - `router.py`: This file defines the API routers and their corresponding endpoints.
  - `__init__.py`: This is an empty file that makes the `api/` directory a Python package.
  - `auth/` directory: It includes files related to authentication.
    - `auth.py`: This file contains authentication-related functions or classes.
    - `user_deps.py`: It defines the dependencies for user authentication.
    - `__init__.py`: This file makes the `auth/` directory a Python package.
  - `handlers/` directory: It contains handler functions for API endpoints.
    - `closest_happy_place.py`: This file defines a handler for the "closest happy place" endpoint.
    - `user.py`: This file defines a handler for user-related endpoints.
    - `user_mood.py`: This file defines a handler for user mood-related endpoints.
    - `__init__.py`: This file makes the `handlers/` directory a Python package.
- `core/` directory: It includes core application files and utilities.
  - `config.py`: This file contains configuration settings for your application.
  - `security.py`: It provides security-related functions or classes.
  - `__init__.py`: This file makes the `core/` directory a Python package.
- `models/` directory: It contains database models or ORM (Object-Relational Mapping) files.
  - `userModel.py`: This file defines the user model.
  - `usermood_model.py`: This file defines the user mood model.
  - `__init__.py`: This file makes the `models/` directory a Python package.
- `schemas/` directory: It includes Pydantic schemas for request and response validation.
  - `auth_schema.py`: This file defines schemas related to authentication.
  - `usermood_schema.py`: This file defines schemas related to user mood.
  - `userSchema.py`: This file defines schemas related to users.
  - `__init__.py`: This file makes the `schemas/` directory a Python package.
- `services/` directory: It contains service files that handle business logic.
  - `usermood_service.py`: This file provides services related to user moods.
  - `userService.py`: This file provides services related to users.
  - `__init__.py`: This file makes the `services/` directory a Python package.
- The `tests/` directory includes test files for your application.

