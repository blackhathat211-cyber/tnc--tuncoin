/* TUNCOIN (TNC) Official Web3 Logic
    - Secured with textContent (Anti-XSS)
    - Integrated with ethers.js v6
    - Mobile-Ready Sidebar Logic
*/
/*
document.addEventListener('DOMContentLoaded', () => {

    // ======= 1. إعدادات العقود الذكية (Smart Contract Settings) =======
    // استبدل هذا بالعنوان الحقيقي لعملتك TNC
    const TNC_CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678"; 
    
    // واجهة العقد (ABI) - نحتاج فقط للرصيد والعشريات
    const TNC_ABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)"
    ];

    // ======= 2. منطق القائمة الجانبية للهاتف (Sidebar) =======
    const sidebar = document.getElementById('sidebar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => sidebar.classList.add('active'));
        sidebarClose.addEventListener('click', () => sidebar.classList.remove('active'));
    }

    document.querySelectorAll('.sidebar-links a').forEach(link => {
        link.addEventListener('click', () => sidebar.classList.remove('active'));
    });

    // ======= 3. منطق نسخ عنوان العقد (Safe Copy) =======
    const copyBtn = document.getElementById('copyAddressBtn');
    const contractAddressElement = document.getElementById('contractAddress');

    if (copyBtn && contractAddressElement) {
        copyBtn.addEventListener('click', async () => {
            const address = contractAddressElement.textContent; // أمان: استخدام textContent
            try {
                await navigator.clipboard.writeText(address);
                
                // تغيير الأيقونة لتأكيد النسخ (أمان: استخدام textContent للأيقونة غير ممكن لذا نستخدم innerHTML بحذر هنا فقط للأيقونة)
                copyBtn.innerHTML = '<i class="fas fa-check" style="color: #2ecc71;"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    }

    // ======= 4. منطق Web3 و MetaMask (Powered by ethers.js) =======
    const connectBtn = document.getElementById('connectWalletBtn');
    const walletModal = document.getElementById('walletModal');
    const modalClose = document.getElementById('modalClose');
    const userAddressAbbr = document.getElementById('userAddressAbbr');
    const userBalance = document.getElementById('userBalance');

    // وظيفة اختصار العنوان (0x123...456)
    const abbreviateAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask is not installed. Please install it to use TNC Portal.');
            return;
        }

        try {
            // استخدام ethers.js v6
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const account = accounts[0];

            // تحديث الواجهة بأمان
            userAddressAbbr.textContent = abbreviateAddress(account); // أمان
            connectBtn.textContent = "Connected"; // أمان
            connectBtn.style.backgroundColor = "#2ecc71";
            connectBtn.style.color = "#fff";

            // جلب الرصيد الحقيقي من البلوكشين
            const contract = new ethers.Contract(TNC_CONTRACT_ADDRESS, TNC_ABI, provider);
            
            try {
                const rawBalance = await contract.balanceOf(account);
                const decimals = await contract.decimals();
                const formattedBalance = ethers.formatUnits(rawBalance, decimals);
                
                // عرض الرصيد مع فواصل آلاف
                userBalance.textContent = parseFloat(formattedBalance).toLocaleString(undefined, {minimumFractionDigits: 2}); 
            } catch (balanceError) {
                console.warn("Could not fetch TNC balance, maybe contract address is wrong?");
                userBalance.textContent = "0.00";
            }

        } catch (error) {
            console.error('User denied or error occurred:', error);
        }
    };

    // التحكم في فتح المودال أو الربط
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            if (connectBtn.textContent === "Connected") {
                walletModal.classList.add('active');
            } else {
                connectWallet();
            }
        });
    }

    // إغلاق المودال
    if (modalClose) {
        modalClose.addEventListener('click', () => walletModal.classList.remove('active'));
    }

    window.addEventListener('click', (event) => {
        if (event.target === walletModal) {
            walletModal.classList.remove('active');
        }
    });
});













*/
  /* TUNCOIN (TNC) Official Web3 Logic
    - Secured with textContent (Anti-XSS)
    - Integrated with ethers.js v6
    - Profile Modal & Sidebar Management
    - Mobile & Desktop MetaMask Support
*/

document.addEventListener('DOMContentLoaded', () => {

    // ======= 1. إعدادات العقود الذكية (Smart Contract Settings) =======
    // استبدل هذا بالعنوان الحقيقي لعملتك TNC
    const TNC_CONTRACT_ADDRESS = "0xc7cB16361c08c46395A7B952d2922a75FE3431b8"; 
    
    const TNC_ABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)"
    ];

    // ======= 2. منطق القائمة الجانبية للهاتف (Sidebar) =======
    const sidebar = document.getElementById('sidebar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => sidebar.classList.add('active'));
        sidebarClose.addEventListener('click', () => sidebar.classList.remove('active'));
    }

    document.querySelectorAll('.sidebar-links a').forEach(link => {
        link.addEventListener('click', () => sidebar.classList.remove('active'));
    });

    // ======= 3. منطق نسخ عنوان العقد (Safe Copy) =======
    const copyBtn = document.getElementById('copyAddressBtn');
    const contractAddressElement = document.getElementById('contractAddress');

    if (copyBtn && contractAddressElement) {
        copyBtn.addEventListener('click', async () => {
            const address = contractAddressElement.textContent; 
            try {
                await navigator.clipboard.writeText(address);
                copyBtn.innerHTML = '<i class="fas fa-check" style="color: #2ecc71;"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    }

    // ======= 4. منطق Web3 و MetaMask (Powered by ethers.js) =======
    const connectBtn = document.getElementById('connectWalletBtn');
    const walletModal = document.getElementById('walletModal');
    const modalClose = document.getElementById('modalClose');
    const userAddressAbbr = document.getElementById('userAddressAbbr'); // للزر
    const userAddressFull = document.getElementById('userAddressFull'); // للمودال
    const userBalance = document.getElementById('userBalance'); // للمودال

    const abbreviateAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

    // Helper: Detect mobile devices for deep linking
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const connectWallet = async () => {
        // Case 1: MetaMask extension or in-app browser detected (Desktop + MetaMask Mobile Browser)
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const account = accounts[0];

                // تحديث الواجهة بأمان (Safe textContent)
                if (userAddressAbbr) userAddressAbbr.textContent = abbreviateAddress(account);
                if (userAddressFull) userAddressFull.textContent = account; // عرض العنوان الكامل في المودال
                
                connectBtn.textContent = "Connected"; 
                connectBtn.style.backgroundColor = "#2ecc71";
                connectBtn.style.color = "#fff";

                // جلب الرصيد الحقيقي من البلوكشين
                const contract = new ethers.Contract(TNC_CONTRACT_ADDRESS, TNC_ABI, provider);
                
                try {
                    const rawBalance = await contract.balanceOf(account);
                    const decimals = await contract.decimals();
                    const formattedBalance = ethers.formatUnits(rawBalance, decimals);
                    
                    // عرض الرصيد في المودال بتنسيق آمن
                    if (userBalance) {
                        userBalance.textContent = parseFloat(formattedBalance).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });
                    }
                } catch (balanceError) {
                    console.warn("Could not fetch TNC balance.");
                    if (userBalance) userBalance.textContent = "0.00";
                }

            } catch (error) {
                console.error('User denied or error occurred:', error);
            }
            return;
        }

        // Case 2: Mobile browser without MetaMask -> Deep Link to MetaMask In-App Browser
        if (isMobileDevice()) {
            const currentUrl = window.location.href.replace(/^https?:\/\//, '');
            const metaMaskDeepLink = `https://metamask.app.link/dapp/${currentUrl}`;
            window.location.href = metaMaskDeepLink;
            return;
        }

        // Case 3: Desktop without MetaMask -> Fallback prompt
        alert('MetaMask is not installed. Please install it to use TNC Portal.');
        window.open('https://metamask.io/download/', '_blank');
    };

    // ======= 5. التحكم في فتح المودال أو الربط =======
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            // إذا كان الزر يحتوي على Connected، افتح المودال بدلاً من محاولة الربط ثانية
            if (connectBtn.textContent.trim() === "Connected") {
                walletModal.classList.add('active');
            } else {
                connectWallet();
            }
        });
    }

    // إغلاق المودال
    if (modalClose) {
        modalClose.addEventListener('click', () => walletModal.classList.remove('active'));
    }

    window.addEventListener('click', (event) => {
        if (event.target === walletModal) {
            walletModal.classList.remove('active');
        }
    });

    // زر الخروج (Disconnect) - اختياري إذا أضفته في المودال
    const disconnectBtn = document.getElementById('disconnectBtn');
    if (disconnectBtn) {
        disconnectBtn.addEventListener('click', () => {
            location.reload(); // إعادة تحميل الصفحة لتصفير الحالة بأمان
        });
    }
});



// استهداف زر الهوم في الكمبيوتر وزر الهوم في القائمة الجانبية (الهاتف)
const desktopHome = document.getElementById('homeLinkDesk');
const sidebarHome = document.getElementById('homeLinkSide');

// دالة التحديث
const refreshPage = (e) => {
    e.preventDefault(); 
    window.location.reload();
};

// تشغيل الوظيفة عند الضغط على أي منهما
if (desktopHome) desktopHome.addEventListener('click', refreshPage);
if (sidebarHome) sidebarHome.addEventListener('click', refreshPage);
