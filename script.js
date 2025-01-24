// استيراد مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBekcFYAivjH934l0t0Z7bAILFcpghJ4Us",
  authDomain: "trex-b4169.firebaseapp.com",
  projectId: "trex-b4169",
  storageBucket: "trex-b4169.firebasestorage.app",
  messagingSenderId: "341755000409",
  appId: "1:341755000409:web:2dd2922673392b47d4e348",
  measurementId: "G-C5CMEE3W9E"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// عند تحميل الصفحة
window.onload = function () {
  if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // احصل على معرف المستخدم
    const userId = tg.initDataUnsafe?.user?.id;

    if (userId) {
      // بناء رابط الإحالة
      const botUsername = "hassansilim267BOT";
      const referralLink = `https://t.me/${botUsername}?start=${userId}`;

      // عرض رابط الإحالة في مربع النص
      const referralInput = document.getElementById("referralLink");
      referralInput.value = referralLink;

      // نسخ الرابط
      const copyButton = document.getElementById("copyButton");
      copyButton.addEventListener("click", function () {
        referralInput.select();
        document.execCommand("copy");
        alert("Referral link copied to clipboard!");
      });

      // جلب عدد الإحالات من Firebase
      fetchReferralCount(userId);
    } else {
      alert("Unable to retrieve user ID. Please try again from Telegram.");
    }
  } else {
    alert("Please open this page within Telegram Web App.");
  }
};

// وظيفة لجلب عدد الإحالات من Firestore
async function fetchReferralCount(userId) {
  try {
    const docRef = doc(db, "Trex", userId); // تعديل مسار المستند حسب قاعدة البيانات
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const referralCount = data.referrals || 0;

      // تحديث عدد الإحالات في الصفحة
      const referralCountSpan = document.getElementById("referralCount");
      referralCountSpan.textContent = referralCount;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching referral count:", error);
  }
}
