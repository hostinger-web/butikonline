function loadBuyerAccounts() {
    const buyerAccountsContainer = document.getElementById("buyerAccounts");

    // Data akun pembeli contoh
    const buyerAccounts = [
        { username: "buyer1", email: "buyer1@example.com" },
        { username: "buyer2", email: "buyer2@example.com" },
        { username: "buyer1", email: "buyer1@example.com" },
        { username: "buyer1", email: "buyer1@example.com" },
        { username: "buyer1", email: "buyer1@example.com" }
    ];

    let accountsHTML = "<h3>Daftar Akun Pembeli:</h3><ul>";
    buyerAccounts.forEach((account, index) => {
        accountsHTML += `
            <li>
                ${account.username} - ${account.email}
                <button onclick="deleteAccount(${index})">Hapus</button>
            </li>
        `;
    });
    accountsHTML += "</ul>";
    buyerAccountsContainer.innerHTML = accountsHTML;
}

function deleteAccount(index) {
    if (confirm("Anda yakin ingin menghapus akun ini?")) {
        // Logika penghapusan akun (misalnya, hapus dari database atau array)
        alert("Akun berhasil dihapus!");
        loadBuyerAccounts();
    }
}

function logout() {
    sessionStorage.removeItem("isAdminLoggedIn");
    window.location.href = "index.html";
}

loadBuyerAccounts();
