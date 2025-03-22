# ENGCE301 - Final LAB Solution

This is our Solution for the Final LAB in ENGCE301 Class team8

## 📋 Overview Web interface

<p align="center">
  <img src="Document/image/Overview1.png" alt="Overview1" width="80%">
</p>

### view our final lab from here [[ link ]](https://lab-wb.cpe-rmutl.net/team07/#/wallboard)
<br>

# Task

## 📚 API Specification Documentation

📑 [View Complete API Documentation](./Document/README.md)

## ✅ Test Cases

### Agent Notification

| รหัสทดสอบ | รายละเอียดการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลลัพธ์ |
|-----------|-------------------|-----------------|--------|
| R1.1 | ล็อกอินด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง | สามารถล็อกอินได้ | [ดูผลลัพธ์](Document/results/1.1.jpg) |
| R1.1 | ล็อกอินด้วยชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง | แสดงข้อความเตือนและปฏิเสธการล็อกอิน | [ดูผลลัพธ์](Document/results/1.2.jpg) |
| R1.2 | ล็อกอินเข้าระบบและตรวจสอบประวัติ | มีการบันทึกเวลาการล็อกอินและล้อกเอาท์ใน AgentLoginHistory | [ดูผลลัพธ์](Document/results/1.2.2.png) |
| R1.3 | ล็อกอินเข้าระบบและตรวจสอบการเปลี่ยนสถานะ | แจ้งเตือนการเปลี่ยนสถานะของ agent | [ดูผลลัพธ์](Document/results/1.3.jpg) |
| R1.4 | ล็อกอินเข้าระบบและตรวจสอบเก็บประวัติการพุดคุย | บันทึกข้อความใน AgentMessageHistory | [ดูผลลัพธ์](Document/results/1.4.png) |


### Agent Wallboard

| รหัสทดสอบ | รายละเอียดการทดสอบ | ผลลัพธ์ที่คาดหวัง | ผลลัพธ์ |
|------------|-------------------|-----------------|--------|
| R2.1 | เข้าหน้า Wallboard และตรวจสอบการแสดงผล   | แสดงสถานะของเอเจนต์ทั้งหมดบน Banner | [ดูผลลัพธ์](Document/results/2.1.png) |
| R2.2 | เข้าหน้าประวัติการใช้งานใน Wallboard   | แสดงข้อมูลประวัติล็อกอิน/ล็อกเอาต์ทั้งหมด | [ดูผลลัพธ์](Document/results/2.2.png) |
| R2.2 | เข้าหน้าประวัติการเปลี่ยนสถานะใน Wallboard   | แสดงข้อมูลการเปลี่ยนสถานะทั้งหมดของเอเจนต์ | [ดูผลลัพธ์](Document/results/2.2.1.png) |
| R2.3 | เข้าหน้าประวัติการพูดคุยใน Wallboard   | แสดงข้อมูลการพูดคุยทั้งหมดระหว่างเอเจนต์ | [ดูผลลัพธ์](Document/results/2.3.png) |

<br><br>

## 📊 Data Flow Diagrams
### ระดับ context
<p align="center">
  <img src="Document/image/DFD diagram.jpg" alt="Data Flow Diagrams" width="450" height="450">
</p>
<br>

## 🗃️ ER Diagrams

<p align="center">
  <img src="Document/image/ERD.jpg" alt="ER Diagram" width="520">
</p>
<br>

## 🔄 Activity Flow Diagram

```mermaid
stateDiagram-v2
    [*] --> ApplicationClosed
    ApplicationClosed --> LoginScreen: เปิดแอปพลิเคชัน
    
    state LoginScreen {
        [*] --> CredentialInput
        CredentialInput --> ValidationProcess: กรอกข้อมูล
        ValidationProcess --> ErrorState: ข้อมูลไม่ถูกต้อง
        ErrorState --> CredentialInput: แสดงข้อความผิดพลาด
        ValidationProcess --> TokenGeneration: ข้อมูลถูกต้อง
        TokenGeneration --> WebSocketConnection: บันทึก Token
    }
    
    LoginScreen --> Dashboard: เชื่อมต่อ WebSocket สำเร็จ
    
    state Dashboard {
        [*] --> IdleState
        
        state StatusManagement {
            [*] --> StatusSelection
            StatusSelection --> APIRequest: เลือกสถานะใหม่
            APIRequest --> DatabaseUpdate: ส่งคำขอไปยัง Endpoint API
            DatabaseUpdate --> HistoryRecording: อัปเดตฐานข้อมูล SQL
            HistoryRecording --> WebSocketNotification: บันทึกประวัติใน Parse Server
            WebSocketNotification --> [*]: แจ้งเตือนผ่าน WebSocket
        }
        
        state MessagingProcess {
            [*] --> RecipientInput
            RecipientInput --> MessageInput: กรอกรหัสเอเจนต์ปลายทาง
            MessageInput --> MessageSending: พิมพ์ข้อความ
            MessageSending --> MessageStorage: ส่งผ่าน Endpoint API
            MessageStorage --> WebSocketForwarding: บันทึกใน Parse Server
            WebSocketForwarding --> NotificationDelivery: ส่งต่อผ่าน WebSocket
            NotificationDelivery --> [*]: แสดงการแจ้งเตือน
        }
        
        state LogoutProcess {
            [*] --> LogoutRequest
            LogoutRequest --> StatusUpdate: ส่งคำขอออกจากระบบ
            StatusUpdate --> LogoutHistory: อัปเดตสถานะเป็นออกจากระบบ
            LogoutHistory --> ConnectionTermination: บันทึกประวัติการออกจากระบบ
            ConnectionTermination --> SessionClosure: ตัดการเชื่อมต่อ WebSocket
            SessionClosure --> [*]: ปิด Session
        }
        
        IdleState --> StatusManagement: เลือกเปลี่ยนสถานะ
        StatusManagement --> IdleState
        
        IdleState --> MessagingProcess: เลือกส่งข้อความ
        MessagingProcess --> IdleState
        
        IdleState --> LogoutProcess: เลือกออกจากระบบ
    }
    
    Dashboard --> LoginScreen: กลับสู่หน้าล็อกอิน
    LoginScreen --> ApplicationClosed: ปิดแอปพลิเคชัน
    
    [*] --> AdminClosed
    AdminClosed --> AdminDashboard: เปิดแอปพลิเคชัน Wallboard
    
    state AdminDashboard {
        [*] --> StatusViewing
        StatusViewing --> LoginHistoryViewing: ดูข้อมูลสถานะเอเจนต์
        LoginHistoryViewing --> StatusHistoryViewing: ตรวจสอบประวัติการเข้าใช้งาน
        StatusHistoryViewing --> MessageHistoryViewing: ตรวจสอบประวัติการเปลี่ยนสถานะ
        MessageHistoryViewing --> [*]: ตรวจสอบประวัติการส่งข้อความ
    }
    
    AdminDashboard --> AdminClosed: ปิดแอปพลิเคชัน
```
<br>


```markdown
## 👥 Our Team

| นายวรพฤกษ์  พงษปิน| [Github](https://github.com/Worapruk) |
| นายเพิ่มทรัพย์ บัวมั่น | [Github](https://github.com/Poemsup65) |
| นายกฤษดาวุธ  ดีมงคล | [Github](https://github.com/kritsadawut07) |

---
<p align="center">
  <i>Submitted March 2025 • Department of Computer Engineering</i>
</p>