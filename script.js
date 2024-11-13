let selectedItemName = "";
let selectedItemPrice = 0; // Set default to 0
let selectedItemColor = "";

// Array untuk menyimpan item yang dipilih
const cart = [];

// Fungsi untuk menampilkan subkategori berdasarkan kategori yang dipilih
function showSubcategories(category) {
    // Sembunyikan semua subkategori
    document.getElementById("bajuSubcategories").style.display = "none";
    document.getElementById("sepatuSubcategories").style.display = "none";
    document.getElementById("celanaSubcategories").style.display = "none";

    // Tampilkan subkategori yang sesuai
    if (category === 'Baju') {
        document.getElementById("bajuSubcategories").style.display = "block";
    } else if (category === 'Sepatu') {
        document.getElementById("sepatuSubcategories").style.display = "block";
    } else if (category === 'Celana') {
        document.getElementById("celanaSubcategories").style.display = "block";
    }
}

// Fungsi untuk menampilkan pemilih warna dan mengambil harga dari elemen yang sesuai
function showColorPicker(itemName, itemPrice) {
    selectedItemName = itemName;
    selectedItemPrice = itemPrice; // Simpan harga item yang dipilih
    selectedItemColor = ""; // Reset warna yang dipilih
    document.getElementById("colorModal").style.display = "block"; // Tampilkan modal pemilihan warna
    document.getElementById("checkoutButton").style.display = "none"; // Sembunyikan tombol checkout saat membuka modal
}

// Fungsi untuk memilih warna
function selectColor(color) {
    selectedItemColor = color; // Simpan warna yang dipilih
    alert(`Anda memilih warna ${color} untuk ${selectedItemName}`);
    document.getElementById("checkoutButton").style.display = "block"; // Tampilkan tombol checkout setelah memilih warna
}

// Fungsi untuk menutup modal pemilihan warna
function closeColorModal() {
    document.getElementById("colorModal").style.display = "none";
    selectedItemName = ""; // Reset nama item
    selectedItemPrice = 0; // Reset harga item
    selectedItemColor = ""; // Reset warna item
    document.getElementById("checkoutButton").style.display = "none"; // Sembunyikan tombol checkout
}

// Fungsi untuk menambah item ke keranjang
function addToCart(itemName, itemPrice, itemColor) {
    const username = sessionStorage.getItem("username");
    if (!username) {
        alert("Silakan login sebagai pembeli terlebih dahulu.");
        buyerLogin(); // Meminta login jika belum
    } else {
        // Tambahkan item ke keranjang
        cart.push({ name: itemName, price: itemPrice, color: itemColor });
        alert(`${itemName} dengan warna ${itemColor} berhasil ditambahkan ke keranjang.`);
    }
}

// Fungsi untuk melanjutkan ke checkout setelah memilih warna
function goToCheckout() {
    if (!selectedItemColor) {
        alert("Silakan pilih warna terlebih dahulu.");
        return;
    }
    addToCart(selectedItemName, selectedItemPrice, selectedItemColor); // Tambahkan item ke keranjang
    closeColorModal(); // Tutup modal
    alert("Item telah ditambahkan ke keranjang.");
    
    // Arahkan ke halaman checkout jika ingin checkout
    if (confirm("Apakah Anda ingin melanjutkan ke pembayaran?")) {
        if (cart.length === 0) {
            alert("Keranjang belanja kosong!");
        } else {
            // Simpan informasi checkout di sessionStorage untuk ditampilkan di halaman checkout
            const username = sessionStorage.getItem("username");
            const checkoutInfo = {
                username: username,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                cart: cart
            };
            sessionStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));
            window.location.href = "checkout.html"; // Arahkan ke halaman checkout
        }
    }
}

// Fungsi login untuk pembeli
function buyerLogin() {
    const username = prompt("Masukkan nama pembeli:");
    if (username) {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", "buyer"); // Set peran sebagai pembeli
        alert("Login berhasil, selamat datang " + username);
    } else {
        alert("Login gagal, nama pembeli tidak boleh kosong.");
    }
}

// Fungsi login untuk admin
function adminLogin() {
    const adminUsername = prompt("Masukkan username admin:");
    const adminPassword = prompt("Masukkan password admin:");

    // Validasi login admin
    const validAdmin = { username: "admin", password: "1234" };

    if (adminUsername === validAdmin.username && adminPassword === validAdmin.password) {
        sessionStorage.setItem("username", adminUsername);
        sessionStorage.setItem("role", "admin");
        alert("Login admin berhasil, selamat datang " + adminUsername);
        window.location.href = "admin_dashboard.html"; // Arahkan ke halaman dashboard admin
    } else {
        alert("Login admin gagal, username atau password salah.");
    }
}
