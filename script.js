// استخراج معرف المستخدم (user_id) من Telegram Web App
window.onload = function() {
  // تحقق من وجود Telegram Web App
  if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // احصل على معرف المستخدم
    const userId = tg.initDataUnsafe?.user?.id;

    if (userId) {
      // بناء رابط الإحالة باستخدام userId
      const botUsername = "hassansilim267BOT";
      const referralLink = `https://t.me/${botUsername}?start=${userId}`;

      // تحديث الرابط في HTML
      const referralAnchor = document.getElementById("referralLink");
      referralAnchor.href = referralLink;
      referralAnchor.textContent = referralLink;
    } else {
      alert("Unable to retrieve user ID. Please try again from Telegram.");
    }
  } else {
    alert("Please open this page within Telegram Web App.");
  }
};
