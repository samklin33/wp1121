# NTUEE Webprogramming hw2

### 1. 啟動後端

將 `.env.example` 檔名更改成 `.env`
```bash
PORT=8000
MONGO_URL="mongodb+srv://<username>:<password>@<cluster>.example.mongodb.net/?retryWrites=true&w=majority"
```

```bash
cd backend
yarn
yarn dev
```

### 2. 啟動前端

將 `.env.example` 檔名更改成 `.env`
```bash
cd frontend
yarn dev
```

### 作業說明
1. 基礎要求
  a. 首頁DELETE按鈕：首頁的delete按鈕直接放在各播放清單的標題右側，直接按下即可刪除該播放清單
  b. 歌曲DELETE按鈕：播放清單內點選歌曲即可進入檢視及編輯頁面，可在此頁面刪除歌曲
2. 進階要求
  a. 使用者提示：當使用者未輸入資訊或是進行錯誤操作時，給予適當提示。例如使用者新增或編輯清單時，未輸入標題，以彈窗提示「請輸入標題」。
     說明：當使用者在編輯或新增歌曲或撥放清單時無輸入內容時會跳出alert提醒使用者
  b. 搜尋：在首頁實作搜尋功能，透過輸入關鍵字尋找相對應之清單。
     說明：首頁右上方有搜尋欄，輸入關鍵字後按下搜尋即可找到含有關鍵字的播放清單(不包括大小寫)