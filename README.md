<div align="center">
<img width="220" alt="atm" src="https://github.com/soojinahn/banking_app/tree/main/frontend/src/assets/atm.png">
<br>
<br>

[![FastAPI and React Application](https://skillicons.dev/icons?i=py,fastapi,react,mysql)](https://skillicons.dev)
</div>

# Simple Banking App
ATM처럼 작동하는 간단한 은행 애플리케이션입니다. 실제 은행 시스템과 연결하는 것이 아니라, 그 기초를 다지는 데 중점을 두고 개발했습니다.

## 사용 기술 📚
**개요:** 백엔드에는 Python과 FastAPI를, 프론트엔드에는 ReactJS를 사용하여 웹 애플리케이션을 구축하였습니다.

**Frontend:** ReactJS, Bulma\
**Backend:** Python, FastAPI, SQLAlchemy\
**Database:** MySQL\
**Tools:** VS Code, Git, GitHub

## 기능 ✨
### 기본 흐름
- Login → Select account → See balance/deposit/withdraw

### 유저 스토리 (User/Purpose/Action)

1. 사용자는 이메일과 PIN 번호로 로그인할 수 있습니다.
    - 사용자가 제출 버튼을 클릭하면 양식을 검증하고 사용자 자격 증명을 확인합니다.
    - 자격 증명이 틀리거나 양식이 유효하지 않은 경우와 같은 오류가 발생하면 사용자에게 알림이 표시됩니다.
        *ATM에 PIN 번호를 제공하지 않지만, PIN 번호가 맞는지 여부를 ATM에 알려줄 수 있습니다.*

2. 로그인에 성공하면, 사용자는 자신의 이름과 모든 계좌 목록을 볼 수 있습니다.
사용자는 거래에 사용할 계좌를 선택하도록 안내받습니다.

3. 계좌를 선택하면 사용자는 다음 거래 중 하나를 선택할 수 있습니다: 잔액 확인, 입금, 또는 출금.
모든 페이지에는 'Back' 버튼이 있어 사용자가 이동할 수 있습니다. 다음은 각 선택에 대한 예상 동작입니다:
    - **잔액 확인 (Check Balance)**: 사용자는 계좌 잔액을 확인할 수 있습니다.
    - **입금 (Deposit)**: 사용자는 계좌 잔액을 확인하고, 입금 금액을 입력할 수 있습니다. 입금이 성공하면, 갱신된 계좌 잔액을 볼 수 있습니다. 오류가 발생하면 사용자에게 알림이 표시됩니다.
    - **출금 (Withdraw)**: 사용자는 계좌 잔액을 확인하고, 출금 금액을 입력할 수 있습니다. 출금이 성공하면, 갱신된 계좌 잔액을 볼 수 있습니다. 오류가 발생하면 사용자에게 알림이 표시됩니다.
        - *사용자는 현재 잔액을 초과하여 출금할 수 없습니다.*

## 데이터베이스 (MySQL) 💿
- MySQL은 소규모에서 중규모의 은행 시스템에서 많이 사용되는 데이터베이스입니다. 대기업들은 보통 Oracle, SQL Server, IBM 및 기타 상용 데이터베이스를 사용합니다.


<div align="center">
<img width="230" alt="database" src="https://github.com/soojinahn/banking_app/tree/main/frontend/src/assets/database.png">

*Figure 1. ER Diagram for the project.*
</div>


## App Demo 👾

![Demo](https://github.com/user-attachments/assets/1d10fef9-e9a5-4711-8d46-63be3fbb7488)