from fastapi.testclient import TestClient
from  src.main import app

client = TestClient(app)

def test_get_account():
    response = client.get("/customers/1/accounts/1")
    assert response.status_code == 200
    assert response.json() == {
        "balance": 12.75,
        "id": 1,
        "owner_id": 1,
    }

def test_get_customer():
    response = client.get("/customers/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "John Doe",
        "email": "abc@example.com",
        "pin": "0213",
        "accounts": [{'balance': 12.75, 'id': 1, 'owner_id': 1}]
    }

def test_nonexistent_customer():
    response = client.get("/customers/-1000")
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

def test_nonexistent_account():
    response = client.get("customers/1/accounts/-1000")
    assert response.status_code == 404
    assert response.json() == {"detail": "Account not found"}