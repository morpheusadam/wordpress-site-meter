// قیمت‌های پشتیبانی
const SUPPORT_MONTHLY = 2000000; // هر ماه
const SUPPORT_YEARLY  = 6000000; // پکیج سالانه

// ارجاع به تمام عناصر
const els = {
  // انتخاب‌ها
  websiteType: document.getElementById('websiteType'),
  uiDesign: document.getElementById('uiDesign'),
  pages: document.getElementById('pages'),
  customization: document.getElementById('customization'),
  scalability: document.getElementById('scalability'),
  seoLevel: document.getElementById('seoLevel'),

  // چک‌باکس‌های گروهی
  uiFeatures: document.querySelectorAll('.ui'),
  pageFeatures: document.querySelectorAll('.page'),
  featurePlugins: document.querySelectorAll('.feature'),
  customFeatures: document.querySelectorAll('.custom'),
  secperfFeatures: document.querySelectorAll('.secperf'),
  supportExtras: document.querySelectorAll('.support'),
  seoExtras: document.querySelectorAll('.seo'),
  scaleExtras: document.querySelectorAll('.scale'),
  specialFeatures: document.querySelectorAll('.special'),

  // پشتیبانی
  supportRadios: document.querySelectorAll('input[name="support"]'),
  monthlyWrapper: document.getElementById('monthlyWrapper'),
  months: document.getElementById('months'),

  // خروجی
  totalCost: document.getElementById('totalCost'),
  breakdown: document.getElementById('breakdown'),
  calcBtn: document.getElementById('calculateBtn'),

  // برچسب‌های قیمت
  monthlyLabel: document.querySelector('[data-monthly-label]'),
  yearlyLabel: document.querySelector('[data-yearly-label]'),
};

// فرمت تومان (۲,۰۰۰,۰۰۰ تومان)
function toToman(n) {
  return n.toLocaleString('fa-IR') + ' تومان';
}

// نمایش/مخفی کردن فیلد تعداد ماه پشتیبانی
function toggleMonthly() {
  const type = getSupportType();
  els.monthlyWrapper.classList.toggle('hidden', type !== 'monthly');
}

// خواندن نوع پشتیبانی
function getSupportType() {
  let val = 'none';
  els.supportRadios.forEach(r => { if (r.checked) val = r.value; });
  return val;
}

// محاسبه کلی
function calculate() {
  let total = 0;
  const breakdown = []; // [label, value]

  // ۱. نوع وبسایت
  const websiteVal = parseInt(els.websiteType.value) || 0;
  total += websiteVal;
  breakdown.push(['نوع وبسایت', websiteVal]);

  // ۲. طراحی ظاهر (UI/UX)
  const uiBaseVal = parseInt(els.uiDesign.value) || 0;
  total += uiBaseVal;
  breakdown.push(['طراحی ظاهر (پایه)', uiBaseVal]);

  // چک‌باکس‌های UI
  els.uiFeatures.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۳. تعداد صفحات و بخش‌ها
  const pagesBaseVal = parseInt(els.pages.value) || 0;
  total += pagesBaseVal;
  breakdown.push(['تعداد صفحات (پایه)', pagesBaseVal]);

  // چک‌باکس‌های صفحات
  els.pageFeatures.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۴. امکانات و افزونه‌ها
  els.featurePlugins.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۵. شخصی‌سازی
  const customizationVal = parseInt(els.customization.value) || 0;
  total += customizationVal;
  breakdown.push(['میزان شخصی‌سازی (پایه)', customizationVal]);

  // چک‌باکس‌های شخصی‌سازی
  els.customFeatures.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۶. امنیت و سرعت
  els.secperfFeatures.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۷. پشتیبانی و نگهداری
  const supportType = getSupportType();

  // پشتیبانی اضافه (آموزش، ۲۴/۷، SLA)
  els.supportExtras.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // پشتیبانی دوره‌ای
  if (supportType === 'monthly') {
    const months = Math.min(Math.max(parseInt(els.months.value) || 1, 1), 24);
    const supportCost = SUPPORT_MONTHLY * months;
    total += supportCost;
    breakdown.push([`پشتیبانی ماهانه × ${months} ماه`, supportCost]);
  } else if (supportType === 'yearly') {
    total += SUPPORT_YEARLY;
    breakdown.push(['پشتیبانی سالانه', SUPPORT_YEARLY]);
  }

  // ۸. سئو
  els.seoExtras.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۹. مقیاس‌پذیری و آینده‌نگری
  const scalabilityVal = parseInt(els.scalability.value) || 0;
  total += scalabilityVal;
  breakdown.push(['مقیاس‌پذیری (معماری)', scalabilityVal]);

  // چک‌باکس‌های مقیاس‌پذیری
  els.scaleExtras.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // ۱۰. امکانات خاص
  els.specialFeatures.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value) || 0;
      total += val;
      const label = cb.parentElement.textContent.trim();
      breakdown.push([label, val]);
    }
  });

  // نمایش هزینه نهایی
  els.totalCost.textContent = toToman(total);

  // نمایش ریزکارکرد
  els.breakdown.innerHTML = '';
  breakdown.forEach(([label, value]) => {
    const li = document.createElement('li');
    const spanLabel = document.createElement('span');
    spanLabel.textContent = label;
    const strongValue = document.createElement('strong');
    strongValue.textContent = toToman(value);
    li.appendChild(spanLabel);
    li.appendChild(strongValue);
    els.breakdown.appendChild(li);
  });
}

// رویدادها: تغییر در فرم یا کلیک روی دکمه
['change', 'input'].forEach(eventType => {
  document.getElementById('costForm').addEventListener(eventType, e => {
    if (e.target.name === 'support') toggleMonthly(); // فقط وقتی نام support باشد
    calculate();
  });
});

// دکمه محاسبه
els.calcBtn.addEventListener('click', calculate);

// تنظیم برچسب‌های قیمت پشتیبانی
if (els.monthlyLabel) els.monthlyLabel.textContent = SUPPORT_MONTHLY.toLocaleString('fa-IR');
if (els.yearlyLabel) els.yearlyLabel.textContent = SUPPORT_YEARLY.toLocaleString('fa-IR');

// تنظیم اولیه
toggleMonthly();
calculate();