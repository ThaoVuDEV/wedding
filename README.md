# 💍 Wedding Invitation - Mobile Fullscreen

Một ứng dụng thiệp cưới hiện đại với **tự động scroll** trang, được xây dựng bằng **React**, **TypeScript** và **Tailwind CSS**, tối ưu hóa cho thiết bị di động.

## ✨ Tính năng

- **Fullscreen Sections** - Mỗi trang chiếm toàn bộ màn hình
- **Auto Scroll** - Tự động scroll khi cuộn chuột hoặc bấm mũi tên lên/xuống
- **Smooth Transitions** - Chuyển động mượt mà giữa các trang
- **Music Toggle** - Button âm thanh ngoài góc trên phải
- **Side Navigation Menu** - Menu hamburger (mobile) và điều hạng (desktop)
- **Countdown Timer** - Đếm ngược thời gian đến ngày cưới
- **Responsive Design** - Hoàn toàn responsive trên mọi kích thước màn hình
- **Multiple Pages** - 7 trang fullscreen:
  1. Welcome - Trang chào đón
  2. Our Story - Câu chuyện tình yêu
  3. Wedding - Thông tin kết hôn
  4. Memories - Hình ảnh và lời tình yêu
  5. Details - Chi tiết sự kiện + countdown
  6. RSVP - Biểu mẫu xác nhận tham dự
  7. Thank You - Trang cảm ơn

## 🛠️ Công nghệ

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v3** - Utility-first CSS
- **Vite** - Fast build tool
- **PostCSS** - CSS processing

## 📦 Cài đặt

```bash
cd wedding
npm install
```

## 🚀 Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ mở tại `http://localhost:5175` (hoặc port tiếp theo khả dụng)

## 🏗️ Build cho Production

```bash
npm run build
npm run preview
```

## 📁 Cấu trúc Dự án

```
src/
├── components/
│   ├── Welcome.tsx          # Trang chào đón
│   ├── OurStory.tsx         # Câu chuyện
│   ├── WeddingDay.tsx       # Chi tiết cưới
│   ├── Memories.tsx         # Hình ảnh + lời tình yêu
│   ├── EventDetails.tsx     # Countdown + thông tin sự kiện
│   ├── RSVP.tsx            # Biểu mẫu RSVP
│   ├── ThankYou.tsx        # Trang cảm ơn
│   ├── MusicToggle.tsx     # Button âm thanh
│   └── NavMenu.tsx         # Menu điều hạng
├── App.tsx                  # Component chính
├── main.tsx                # Entry point
└── index.css               # Tailwind styles
```

## 🎮 Điều Khiển

### Desktop

- **Cuộn chuột** (Scroll) - Chuyển trang lên/xuống
- **Mũi tên lên/xuống** - Chuyển trang
- **Click chấm** bên phải - Đi đến trang cụ thể
- **Click hamburger** - Mở menu

### Mobile

- **Vuốt** (Swipe) - Chuyển trang (phát triển thêm)
- **Click chấm** dưới cùng - Đi đến trang cụ thể
- **Click hamburger** bên trái - Mở menu

## ⚙️ Tùy chỉnh

### Thông tin Cơ Bản

Chỉnh sửa trong `src/App.tsx`:

```tsx
<Welcome
  groomName="Tên Chú Rể"
  brideName="Tên Cô Dâu"
  groomAlias="Tên Gọi Chú Rể"
  brideAlias="Tên Gọi Cô Dâu"
/>
```

### Màu Sắc & Fonts

Tùy chỉnh trong `tailwind.config.js`:

```js
colors: {
  burgundy: '#800020',     // Màu chính
  rose: '#F8E8E0',         // Màu nền nhẹ
  gold: '#D4AF37',         // Màu accent
},
fontFamily: {
  serif: ['Playfair Display'],
  sans: ['Poppins'],
}
```

### Âm Thanh Cưới

Cập nhật URL âm thanh trong `App.tsx`:

```tsx
<MusicToggle audioUrl="https://your-music-link.mp3" />
```

### Hình Ảnh

Thêm hình ảnh để thay thế placeholder:

```tsx
<Memories
  images={[
    { src: "/path/to/image1.jpg", alt: "Photo 1" },
    { src: "/path/to/image2.jpg", alt: "Photo 2" },
  ]}
/>
```

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Fullscreen, hamburger menu, bottom dots
- **Tablet** (768px - 1024px): Fullscreen layout optimized
- **Desktop** (> 1024px): Side dots, open menu option

## 🎨 Color Palette

| Màu      | Code    | Sử dụng             |
| -------- | ------- | ------------------- |
| Burgundy | #800020 | Main color, buttons |
| Rose     | #F8E8E0 | Background light    |
| Gold     | #D4AF37 | Accent, borders     |
| White    | #FFFFFF | Text, backgrounds   |
| Gray-700 | #374151 | Body text           |

## 📄 License

MIT

---

**Made with Cinelove** 💕
