import requests
import json

# تكوين معلومات API
NOTION_TOKEN = "your_integration_token_here"
DATABASE_ID = "your_database_id_here"

# تكوين رأس الطلب
headers = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"  # تحقق من أحدث إصدار
}

# استعلام بسيط لجلب صفحات من قاعدة البيانات
def get_pages_from_database():
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    response = requests.post(url, headers=headers)
    data = response.json()
    return data

# إضافة صفحة جديدة إلى قاعدة البيانات
def add_page_to_database(title, description):
    url = "https://api.notion.com/v1/pages"
    
    payload = {
        "parent": {"database_id": DATABASE_ID},
        "properties": {
            "العنوان": {
                "title": [
                    {
                        "text": {
                            "content": title
                        }
                    }
                ]
            },
            "الوصف": {
                "rich_text": [
                    {
                        "text": {
                            "content": description
                        }
                    }
                ]
            }
        }
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    return response.json()

# استدعاء الوظائف
pages = get_pages_from_database()
new_page = add_page_to_database("عنوان جديد", "وصف للصفحة الجديدة")
