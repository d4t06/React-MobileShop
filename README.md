## falsy
- 0
- ''
- null
- NaN
- undefine

## useState
- setState(prevState => prevState + 1) có thể chạy nhiều lận, không phụ thuộc vào biếng bên ngoài
- setState(state + 1) thì cũng chỉ chạy một lần dù gọi nhiều lần
- có thể gán initState qua callback

##useEffect
-callback luôn được gọi mội khi component mount

###useEffect(() => {}, [])
- chỉ gọi call back một lần khi component thêm element vào dom
###useEffect(() => {}, [deps])
- gọi call back một lần khi component thêm element vào dom
- gọi callback khi deps they đổi
###useEffect(() => { return() => {} }, [deps])
-clean up function luôn được gọi trước khi component unmount, gọi sau callback
- dọn dẹp cái cũ khi gọi cái mới

### Update thứ 5 23/2/2023
- Thêm chức năng search có SetTimeout, thêm overlay
- Thêm SetTimeout cho service
- Thêm prop status cho state
- Filter sẽ không chon được trong lúc lây data

### update thứ 7 25/2/2023
- get One, get ALl sẽ không dispatch mà truyền url parameter

### update thứ 2 27/2/2023
- Thêm com modal

### update thứ 4 29/2/2023
- Sửa lại layout trang product
- SelectedSort tương tác được

### update thứ 5 1/3/2023
- Sửa css DetailProductItem
- Sửa css ProductItem
- Fix không reset index khi chuyển giữa dtdd và laptop
- Thêm transition cho ImageSlider, tự đông next ảnh, sửa css
- Thêm component Button
- issue : Chưa fix được tương tác SelecteSort và filter price

### update thứ 6 2/3/2023
- Đặt sort theo bán chạy nhât sẽ không chuyền param, thêm sort theo trả góp
- filter price tất cả sẽ không truyền paramn
- Fix issue selected sort nhưng chưa xong
- Nếu không có filter thì gía trị là ''
- Thêm input tất cả cho các filter

### update thứ 6 3.3/2023
- Đã fix issue selected sort và filter
- Fix searchPage trả về 'Không tìm thất nếu không có kết quả' và hiện loading trong lúc tìm kiếm
- Đã thêm chọn tất cả cho filter
- Craw data rate nhưng chưa xong


### update thứ 3 7/3/2023
- Đã fix fix issue selected sort và filter
- Image chuyển từ fade sang scroll
- xóa frontawesome, cài react icon
- Issue: scroll qua nhanh imageSilder
- Gần hoàn thiện ImageSlider theo cách scrollLeft

### update thứ 4 8/3/2003
- Gân hoan thien ImageSlider
- Tụ viết hàm fixScroll()
- Nếu click không handleStopDrag
- Dùng useRef lưu ảnh, curScroll và index;

### update thứ 5 9/3/2023
- ImageSlider cũng không biết hoàn thiện hay chưa

### update thứ 6 10/3/2023
- Tạo AuthContext
- Thực hiện chức năng đăng nhập
- Thêm request.post
- Tạo icon svg code
- Thêm private route
- Sửa == thành ===

## Code authenticate

### update thứ 3 14/3/2023
- Tạo auth context, useAuth hook
- Tạo trang login, register (with validate)
- Thêm RequireAuth route, navigate to "login" nếu vào các trang được bảo về
- Đăng nhâp thành công, trả về role_code, token, refreshToken, 
    token, role_code lưu vào auth Context, refreshToken được server lưu vào cookie

### update thứ 4 15/3/2023
- Dùng token truy cập tài nguyên ở server
- Tạo axios instance privateRequest để  truyền cookie và tạo header gưi yêu cầu lên server
- Tạo useRefreshToken để cấp mới token sau khi expire
- Nếu refreshToken expire thì navigate to login
- Tạo useLogout
- Tạo persistLogin, lưu đăng nhập nếu trust this device mỗi khi load lại web
- Tạo useLocalStorage, để làm gì cũng đéo biết...

### update thứ 5 16/3/2023
- useAuth chỉ lưu token
- Tạo useLocalStorage, useInput, và useToggle hook
- Lưu persist login vào localstorage thay vì và auth context
- Cài thư viện jwt decode để code token, để lấy username hiển thị header và lấy role_code để pass requireRoute


### update thứ 6 17/3/2023
- Dùng redux intead of context để lưu products
- Fix image width trang detail

### update thứ 7 18/3/2023
- Dùng biến enviroment: tạo file .env.local, tạo tên biến bằng cách REACT_APP_tên bến, dùng process.env.ten bien

### update thứ 5 30/3/2023
- Dùng createAsyncThunk thay cho action
- Dùng biến môi trường vite import.meta.env.tên bến

### update thứ 6 31/3/2023
- Fix logic trang Products
- Fix imageSlider
- Thêm file config
- Sửa logic getMoreProducts thành push mảng vào