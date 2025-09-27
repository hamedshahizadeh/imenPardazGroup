const cards = [
  {
    id: 1,
    img: "/images/c1.jpg",
    alt: "راه اندازی سیستمهای یکپارچه",
    date: "۲۶ آذر ۱۴۰۳",
    title: "راه اندازی سیستمهای یکپارچه",
    description:
      "راه اندازی سیستمهای یکپارچه اداری و مالی و شهر سازی در شهرداری پارس آباد و سازمان حمل و نقل پارس اباد",
    link: "/cards/1",
    content:
      "سیستمهای یکپارچه اداری و مالی آفیس یار ...",
    comments: [
      {
        id: 1,
        author: "مهدی",
        status: "approved", // تایید شده
        adminMessage: "",   // دلیل رد شدن در اینجا خالیه چون تایید شده
        date: "۲۷ آذر ۱۴۰۳",
        text: "خیلی مقاله خوبی بود",
        replies: [
          {
            id: 1,
            author: "سارا",
            date: "۲۸ آذر ۱۴۰۳",
            text: "موافقم، خیلی مفید بود!",
          },
        ],
      },
      {
        id: 2,
        author: "سارا",
        status: "pending", // در انتظار بررسی
        adminMessage: "",
        date: "۲۸ آذر ۱۴۰۳",
        text: "مطالب کاملاً مفید بود، ممنون!",
        replies: [],
      },
    ],
  },
  {
    id: 2,
    img: "/images/c2.jpg",
    alt: "راه اندازی سیستمهای یکپارچه",
    date: "۲۶ آذر ۱۴۰۳",
    title: "راه اندازی سیستم های یکپارچه",
    description:
      "راه اندازی سیستمهای یکپارچه اداری و مالی در شهرداری سرعین و سازمان آتش نشانی شهرداری سرعین",
    link: "/cards/2",
    content:
      "در نتيجه راه حل سيستمهاي ERP ...",
    comments: [
      {
        id: 1,
        author: "علی",
        status: "rejected", // رد شده
        adminMessage: "متن کامنت ناقص است، لطفاً کامل بنویسید.",
        date: "۲۷ آذر ۱۴۰۳",
        text: "سازمان را يكپارچه مي نمايند...",
        replies: [
          {
            id: 1,
            author: "نرگس",
            date: "۲۹ آذر ۱۴۰۳",
            text: "دقیقا، مفید بود",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    img: "/images/c3.jpg",
    alt: "راه اندازی سیستمهای یکپارچه",
    date: "۲۶ آذر ۱۴۰۳",
    title: "راه اندازی اتوماسیون اداری",
    description:
      "راه اندازی اتوماسیون اداری و مالی بصورت یکپارچه در شرکت خدمات بیمه ای امید مشاور",
    link: "/cards/3",
    content:
      "سازمان هاي امروزي ...",
    comments: [
      {
        id: 1,
        author: "رضا",
        status: "approved",
        adminMessage: "",
        date: "۲۸ آذر ۱۴۰۳",
        text: "اطلاعات خیلی جامع بود",
        replies: [],
      },
      {
        id: 2,
        author: "مریم",
        status: "approved",
        adminMessage: "",
        date: "۳۰ آذر ۱۴۰۳",
        text: "خیلی عالی توضیح داده شده",
        replies: [
          { id: 1, author: "علی", date: "۳۰ آذر ۱۴۰۳", text: "موافقم با مریم" },
          { id: 2, author: "حامد", date: "۳۰ آذر ۱۴۰۳", text: "مرسی" },
        ],
      },
    ],
  },
];

export default cards;
