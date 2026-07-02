export type Language = "vi" | "en" | "ko";

type ProductListing = {
  name: string;
  description: string;
};

export type Dictionary = {
  common: {
    brandName: string;
    closeAnnouncement: string;
    openCart: string;
    switchLanguageAriaLabel: (label: string) => string;
    primaryNavigation: string;
    previousProducts: string;
    nextProducts: string;
    previousCatalogs: string;
    nextCatalogs: string;
    previousGallery: string;
    nextGallery: string;
    goTo: string;
  };
  header: {
    announcement: string;
    visitLink: string;
    wishlist: string;
    bookConsultation: string;
    chooseLanguage: string;
  };
  hero: {
    swissMadeBadge: string;
    taglineLine1: string;
    taglineLine2: string;
    description: string;
    cta: string;
    learnMore: string;
    colorPopTitle: string;
    featuredProductName: string;
    featuredProductCategory: string;
    videoTitle: string;
    qrCodeAlt: string;
    playVideo: string;
  };
  promotions: {
    heading: string;
    dateFrom: string;
    dateTo: string;
    preOrderDiscount: string;
    discountPercent: string;
    discountDescription: string;
    consultationHeading: string;
    consultationDescription: string;
  };
  swissMade: {
    heading: string;
    subtitle: string;
    description: string;
    sinceLabel: string;
    sinceYear: string;
    sinceDescription: string;
    precisionEngineering: string;
    precisionDescription: string;
    modularDesign: string;
    modularDescription: string;
  };
  products: {
    label: string;
    heading: string;
    listings: ProductListing[];
    viewDetail: string;
    getConsultation: string;
    carouselPositionLabel: string;
    goToProduct: (index: number) => string;
  };
  exclusive: {
    label: string;
    brandName: string;
    title: string;
    description: string;
    cta: string;
  };
  showroom: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    cta: string;
    exclusiveLabel: string;
    exclusiveTitle: string;
    addressLabel: string;
    address: string;
    addressShort: string;
    hoursLabel: string;
    hoursWeekday: string;
    hoursWeekdayShort: string;
    hoursSunday: string;
    experienceDescription: string;
    bookVisit: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  highlights: {
    authentic: { title: string; copy: string };
    warranty: { title: string; copy: string };
    consult: { title: string; copy: string };
    target: { title: string; copy: string };
  };
  gallery: {
    label: string;
    heading: string;
    description: string;
    viewMore: string;
    imageAlt: string;
    carouselAriaLabel: string;
  };
  catalog: {
    label: string;
    heading: string;
    cta: string;
    catalogButton: string;
    catalogAlt: string;
  };
  whyUsm: {
    label: string;
    heading: string;
    description: string;
    chromeFrame: { title: string; desc: string };
    modularStructure: { title: string; desc: string };
    colorPalette: { title: string; desc: string };
  };
  contact: {
    label: string;
    heading: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    hotlineLabel: string;
    hotlineNumber: string;
    hotlineHours: string;
    emailContactLabel: string;
    emailContactAddress: string;
    emailResponse: string;
    websiteLabel: string;
    websiteUrl: string;
    websiteDescription: string;
    showroomLabel: string;
    showroomName: string;
    showroomAddress: string;
  };
  scrollModal: {
    title: string;
    description: string;
    validity: string;
    name: string;
    phone: string;
    email: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription: string;
    errorGeneric: string;
    errorName: string;
    errorPhone: string;
    errorPhoneFormat: string;
    errorEmail: string;
    errorEmailFormat: string;
    close: string;
  };
  cartModal: {
    title: string;
    collapsedTitle: string;
    collapsedCta: string;
    description: string;
    name: string;
    phone: string;
    email: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription: string;
    errorGeneric: string;
    errorName: string;
    errorPhone: string;
    errorPhoneFormat: string;
    errorEmail: string;
    errorEmailFormat: string;
    close: string;
    cartTitle: string;
    cartEmpty: string;
    retailPrice: string;
    preorderPrice: string;
    subtotal: string;
    total: string;
    deleteTotal: string;
    deleteItem: string;
  };
  home: {
    notice: {
      announcement: string;
      link: string;
      closeAriaLabel: string;
    };
    navigation: {
      logoAlt: string;
      exploreCta: string;
      languageSelectorAriaLabel: string;
      languageOptionAriaLabel: (label: string) => string;
    };
    hero: {
      imageAlt: string;
    };
    saleStrip: {
      backgroundAlt: string;
      summer: string;
      sale: string;
      upTo: string;
      off: string;
      countdown: {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
      };
      cta: string;
    };
    featuredDeals: {
      heading: string;
      subtitle: string;
      cta: string;
      imageTitles: Record<string, string>;
    };
    saleList: {
      heading: string;
      subtitle: string;
      previousAriaLabel: string;
      nextAriaLabel: string;
      offerCta: string;
      consultationCta: string;
      productNames: Record<string, string>;
    };
    distributorFooter: {
      videoTitle: string;
      label: string;
      headlinePrefix: string;
      headlineSuffix: string;
      address: string;
      hours: string;
      hotline: string;
      cta: string;
    };
  };
  footer: {
    copyright: string;
    productHeading: string;
    usmHaller: string;
    usmKitos: string;
    accessories: string;
    serviceHeading: string;
    designConsultation: string;
    installation: string;
    warranty: string;
    contactHeading: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
};

const dictionaries: Record<Language, Dictionary> = {
  vi: {
    common: {
      brandName: "nanoHome",
      closeAnnouncement: "Đóng thông báo",
      openCart: "Mở giỏ hàng",
      switchLanguageAriaLabel: (label) => `Chuyển sang ${label}`,
      primaryNavigation: "Điều hướng chính",
      previousProducts: "Sản phẩm trước",
      nextProducts: "Sản phẩm tiếp",
      previousCatalogs: "Catalog trước",
      nextCatalogs: "Catalog tiếp",
      previousGallery: "Ảnh trước",
      nextGallery: "Ảnh tiếp",
      goTo: "Đến",
    },
    header: {
      announcement: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
      visitLink: "Truy cập nanoHome",
      wishlist: "Yêu thích",
      bookConsultation: "Đặt lịch tư vấn",
      chooseLanguage: "Chọn ngôn ngữ",
    },
    hero: {
      swissMadeBadge: "SWISS MADE",
      taglineLine1: "Chuẩn mực vượt thời gian.",
      taglineLine2: "Thiết kế dành cho mọi không gian.",
      description: "USM Haller là biểu tượng của sự tinh giản, linh hoạt và bền vững, đồng hành cùng bạn hôm nay và mai sau.",
      cta: "Khám phá USM",
      learnMore: "Tìm hiểu thêm",
      colorPopTitle: "USM Color Pop",
      featuredProductName: "Tủ USM Đỏ",
      featuredProductCategory: "Tủ USM modular",
      videoTitle: "SWISS\nMADE",
      qrCodeAlt: "QR Code",
      playVideo: "Phát video",
    },
    promotions: {
      heading: "Ưu đãi đặc biệt",
      dateFrom: "Từ: 15/06/2026",
      dateTo: "Đến: 05/07/2026",
      preOrderDiscount: "Đặt trước giảm ngay",
      discountPercent: "20%",
      discountDescription: "Ưu đãi giảm cho đơn hàng Pre-order USM",
      consultationHeading: "Tư vấn dự án",
      consultationDescription: "Giải pháp thiết kế và bố trí miễn phí cùng các chuyên gia.",
    },
    swissMade: {
      heading: "SWISS MADE",
      subtitle: "Bảo chứng cho không gian sống",
      description: "Hơn 140 năm tinh hoa chế tác Thụy Sĩ được kết tinh trong từng chi tiết USM Haller. Bền bỉ, chính xác và vượt thời gian - để đồng hành cùng bạn trong mọi không gian sống",
      sinceLabel: "SINCE",
      sinceYear: "1965",
      sinceDescription: "Sản xuất và nhập khẩu 100% từ thuỵ sĩ",
      precisionEngineering: "PRECISION\nENGINEERING",
      precisionDescription: "Kỹ thuật chính xác, chất lượng bền vững",
      modularDesign: "MODULAR\nDESIGN",
      modularDescription: "Linh hoạt và thích ứng với mọi không gian",
    },
    products: {
      label: "Products",
      heading: "Sản Phẩm nổi bật",
      listings: [
        {
          name: "USM HALLER Cabinet, O3",
          description: "Tủ USM HALLER O3, kích thước Dài 773 x Sâu 373 x Cao 1090 mm, chất liệu kim loại, màu Trắng Pure White",
        },
        {
          name: "USM HALLER Cabinet, O2xC2",
          description: "Tủ USM HALLER O2xC2, kích thước Dài 1523 x Sâu 373 x Cao 565 mm, chất liệu kim loại, màu Cam Pure Orange",
        },
        {
          name: "USM HALLER Cabinet, C2xO2",
          description: "Tủ nội thất văn phòng USM HALLER C2xO2, kích thước Dài 1523 x Sâu 373 x Cao 565 mm, chất liệu kim loại.",
        },
        {
          name: "USM HALLER Cabinet, C2xC2",
          description: "Tủ USM HALLER C2xC2, kích thước Dài 1523 x Sâu 373 x Cao 740 mm, chất liệu kim loại, màu Đỏ Ruby Red",
        },
        {
          name: "USM HALLER Cabinet, CxO Wide",
          description: "Tủ USM HALLER CxO Wide, kích thước Dài 773 x Sâu 373 x Cao 740 mm, chất liệu kim loại, màu Xanh Gentian Blue",
        },
        {
          name: "USM Haller Cabinet, O3xC3",
          description: "Tủ USM HALLER O3xOC Low, kích thước Dài 2273 x Sâu 373 x Cao 565 mm, chất liệu kim loại",
        },
        {
          name: "USM HALLER Cabinet, C3xC3",
          description: "Tủ USM HALLER C3xC3, kích thước Dài 2273 x Sâu 373 x Cao 740 mm, chất liệu kim loại, màu Beige",
        },
        {
          name: "USM HALLER Cabinet, CxO",
          description: "Tủ USM HALLER CxO, kích thước Dài 523 x Sâu 373 x Cao 565 mm, chất liệu kim loại, màu Vàng Golden Yellow",
        },
      ],
      viewDetail: "ĐẶT HÀNG",
      getConsultation: "Nhận tư vấn",
      carouselPositionLabel: "Vị trí carousel sản phẩm",
      goToProduct: (index) => `Đến sản phẩm ${index}`,
    },
    exclusive: {
      label: "Độc quyền phân phối",
      brandName: "nanoHome",
      title: "Đối tác độc quyền\ncủa USM tại Việt Nam",
      description: "Trải nghiệm, tư vấn và dịch vụ chính hãng từ nanoHome, mang giải pháp nội thất chuẩn Thụy Sĩ cho không gian sống của bạn.",
      cta: "Khám phá USM",
    },
    showroom: {
      label: "Độc quyền phân phối",
      titleLine1: "nanoHome",
      titleLine2: "Trực tiếp trải nghiệm\nUSM tại Việt Nam",
      cta: "Khám phá USM",
      exclusiveLabel: "ĐỘC QUYỀN PHÂN PHỐI",
      exclusiveTitle: "nanoHome là đơn vị bán độc quyền, Authorized by USM tại Việt Nam",
      addressLabel: "Địa chỉ",
      address: "675 - 677 Điện Biên Phủ, Phường Thạnh Mỹ Tây (Phường 25, Quận Bình Thạnh Cũ), Thành Phố Hồ Chí Minh.",
      addressShort: "675 - 677 Điện Biên Phủ, Phường Thạnh Mỹ Tây, Quận Bình Thạnh, TP. Hồ Chí Minh",
      hoursLabel: "Giờ mở cửa",
      hoursWeekday: "Thứ 2 - Thứ 7: 9:00 - 18:00",
      hoursWeekdayShort: "9:00 - 18:00 (Từ Thứ Hai đến Chủ Nhật)",
      hoursSunday: "Chủ nhật: 10:00 - 16:00",
      experienceDescription: "Trải nghiệm trực tiếp các sản phẩm USM Haller và nhận tư vấn từ đội ngũ chuyên gia",
      bookVisit: "Khám phá USM",
      paragraph1: "nanoHome là đơn vị phân phối được uỷ quyền bởi USM tại Việt Nam.",
      paragraph2: "Tại nanoHome Gallery & Module Cafe, khách hàng có thể trực tiếp khám phá các dòng sản phẩm USM Haller, trải nghiệm chất liệu, bảng màu, cấu hình module và cách USM được ứng dụng trong không gian sống thực tế.",
      paragraph3: "Một không gian dành cho những ai yêu thiết kế chuẩn mực, đề cao chất lượng và tìm kiếm giải pháp nội thất bền vững theo thời gian.",
    },
    highlights: {
      authentic: {
        title: "Hàng chính hãng 100%",
        copy: "Nhập khẩu và phân phối độc quyền tại Việt Nam.",
      },
      warranty: {
        title: "Đội ngũ chuyên sâu",
        copy: "Đội ngũ được đào tạo bởi USM, sẵn sàng tư vấn cấu hình, lắp đặt và mở rộng hệ tủ.",
      },
      consult: {
        title: "Giao hàng và lắp đặt",
        copy: "Hỗ trợ vận chuyển, lắp đặt tại công trình và hướng dẫn sử dụng chi tiết.",
      },
      target: {
        title: "Trải nghiệm thực tế",
        copy: "Ghé showroom để xem trực tiếp linh kiện, màu sắc, vật liệu và cơ chế vận hành.",
      },
    },
    gallery: {
      label: "USM HALLER SYSTEM",
      heading: "Hình ảnh USM\ntại Việt Nam",
      description: "Khám phá không gian sống và làm việc tuyệt đẹp với USM Haller tại Việt Nam",
      viewMore: "Khám phá USM",
      imageAlt: "USM gallery view",
      carouselAriaLabel: "Carousel hình ảnh USM",
    },
    catalog: {
      label: "Catalog",
      heading: "Khám phá bộ sưu tập\nvà giải pháp từ USM",
      cta: "Khám phá USM",
      catalogButton: "Xem Catalog",
      catalogAlt: "USM catalog",
    },
    whyUsm: {
      label: "USM HALLER SYSTEM",
      heading: "Vì sao nên sở hữu\nUSM HALLER?",
      description: "Những sản phẩm USM được tạo nên từ những vật liệu chọn lọc và kỹ thuật chính xác đến từng chi tiết - mang lại độ bền, sự linh hoạt và vẻ đẹp vượt thời gian.",
      chromeFrame: { title: "Khung thép mạ Chrome", desc: "Sáng bóng, bền bỉ, chống ăn mòn" },
      modularStructure: { title: "Cấu trúc Modular", desc: "Thiết kế Module linh hoạt. Dễ dàng mở rộng, thay đổi và tái sử dụng" },
      colorPalette: { title: "Bảng màu đa dạng", desc: "Linh hoạt phối hợp theo cá tính" },
    },
    contact: {
      label: "CONTACT FORM",
      heading: "Liên hệ tư vấn &\nLắp đặt USM",
      description: "Đặt lịch tư vấn cùng chuyên gia để nhận giải pháp thiết kế nội thất linh hoạt, bền vững cho không gian của bạn",
      nameLabel: "Họ Và tên",
      namePlaceholder: "Nhập họ và tên",
      phoneLabel: "Số điện thoại",
      phonePlaceholder: "Nhập số điện thoại",
      emailLabel: "Email",
      emailPlaceholder: "Nhập email",
      messageLabel: "Tin nhắn",
      messagePlaceholder: "Vui lòng để lại tin nhắn",
      submit: "Gửi thông tin",
      submitting: "Đang gửi...",
      success: "Cảm ơn bạn! Thông tin đã được gửi thành công.",
      error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      hotlineLabel: "Hotline",
      hotlineNumber: "(+84) 33 948 7632",
      hotlineHours: "Thứ Hai đến Thứ Bảy | 9AM - 6PM",
      emailContactLabel: "Email",
      emailContactAddress: "info@nanohome.vn",
      emailResponse: "Phản hồi trong 24h",
      websiteLabel: "Website",
      websiteUrl: "https://www.nanohome.vn/",
      websiteDescription: "Khám phá các giải pháp và cảm hứng từ USM",
      showroomLabel: "Showroom",
      showroomName: "nanoHome Gallery Saigon",
      showroomAddress: "675 - 677 Điện Biên Phủ, Phường Thạnh Mỹ Tây (Phường 25, Quận Bình Thạnh Cũ), Thành Phố Hồ Chí Minh.",
    },
    scrollModal: {
      title: "Ưu đãi đặt trước USM Haller.",
      description: "Nhận ưu đãi 20% cho các đơn hàng Pre-order từ 15/06/2026 đến 05/07/2026.",
      validity: "Từ 15/06/2026 đến 05/07/2026",
      name: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email",
      namePlaceholder: "Nguyễn Văn A",
      phonePlaceholder: "0901234567",
      emailPlaceholder: "you@example.com",
      submit: "Nhận ưu đãi ngay",
      submitting: "Đang gửi...",
      successTitle: "Cảm ơn bạn!",
      successDescription: "Chúng tôi đã ghi nhận yêu cầu của bạn. Đội ngũ tư vấn sẽ liên hệ trong vòng 24 giờ.",
      errorGeneric: "Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.",
      errorName: "Vui lòng nhập họ và tên",
      errorPhone: "Vui lòng nhập số điện thoại",
      errorPhoneFormat: "Số điện thoại không hợp lệ (9-11 chữ số)",
      errorEmail: "Vui lòng nhập email",
      errorEmailFormat: "Email không hợp lệ",
      close: "Đóng",
    },
    cartModal: {
      title: "Đăng ký nhận tư vấn",
      collapsedTitle: "NHẬN ƯU ĐÃI NGAY",
      collapsedCta: "CLICK HERE",
      description: "Để lại thông tin để nhận tư vấn cấu hình phù hợp tủ kệ USM",
      name: "Họ và tên",
      phone: "Số điện thoại",
      email: "Email",
      namePlaceholder: "Nhập họ và tên",
      phonePlaceholder: "Nhập số điện thoại",
      emailPlaceholder: "Nhập email của bạn",
      submit: "ĐẶT HÀNG NGAY",
      submitting: "Đang gửi...",
      successTitle: "Cảm ơn bạn!",
      successDescription: "Yêu cầu tư vấn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.",
      errorGeneric: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      errorName: "Vui lòng nhập họ và tên",
      errorPhone: "Vui lòng nhập số điện thoại",
      errorPhoneFormat: "Số điện thoại không hợp lệ (9-11 chữ số)",
      errorEmail: "Vui lòng nhập email",
      errorEmailFormat: "Email không hợp lệ",
      close: "Đóng",
      cartTitle: "Giỏ hàng",
      cartEmpty: "Giỏ hàng của bạn đang trống.",
      retailPrice: "Giá bán lẻ",
      preorderPrice: "Giá pre-order",
      subtotal: "Tạm tính",
      total: "Tổng cộng",
      deleteTotal: "Xoá tất cả",
      deleteItem: "Xoá",
    },
    home: {
      notice: {
        announcement: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
        link: "Truy cập nanoHome",
        closeAriaLabel: "Đóng thông báo",
      },
      navigation: {
        logoAlt: "nanoHome",
        exploreCta: "Khám phá ngay",
        languageSelectorAriaLabel: "Chọn ngôn ngữ",
        languageOptionAriaLabel: (label) => `Chuyển sang ${label}`,
      },
      hero: {
        imageAlt: "Nội thất nanoHome",
      },
      saleStrip: {
        backgroundAlt: "Hoạ tiết nền khuyến mãi",
        summer: "SUMMER",
        sale: "SALE",
        upTo: "UP TO",
        off: "OFF",
        countdown: {
          days: "NGÀY",
          hours: "GIỜ",
          minutes: "PHÚT",
          seconds: "GIÂY",
        },
        cta: "Khám phá ngay",
      },
      featuredDeals: {
        heading: "Featured Deals",
        subtitle: "Ưu đãi nổi bật",
        cta: "Xem sản phẩm",
        imageTitles: {
          "/home_lifestyle_new/lifestyle_1.png": "Ghế SERIES 7 - Model 3107",
          "/home_lifestyle_new/lifestyle_2.png": "USM HALLER Cabinet, CxO Wide",
          "/home_lifestyle_new/lifestyle_3.png": "USM HALLER TROLLEY, O3",
          "/home_lifestyle_new/lifestyle_4.png": "PH 5 ORIGINAL SIZE Pendant",
          "/home_lifestyle_new/lifestyle_5.png": "Ghế DROP - Model 3110",
          "/home_lifestyle_new/lifestyle_6.png": "USM HALLER Cabinet, CxO Wide",
          "/home_lifestyle_new/lifestyle_7.png": "Ghế SERIES 7 - Model 3107",
          "/home_lifestyle_new/lifestyle_8.png": "PH 5 ORIGINAL SIZE Pendant",
        },
      },
      saleList: {
        heading: "Summer Sale List",
        subtitle: "Danh sách sản phẩm",
        previousAriaLabel: "Sản phẩm trước",
        nextAriaLabel: "Sản phẩm tiếp",
        offerCta: "Xem ưu đãi",
        consultationCta: "Nhận tư vấn",
        productNames: {
          "usm-haller-cabinet-cxo-wide": "USM HALLER Cabinet, CxO Wide",
          "usm-haller-trolley-o3": "USM HALLER TROLLEY, O3",
          "series-7-chair": "Ghế SERIES 7",
          "ph5-original-size-pendant": "PH 5 ORIGINAL SIZE Pendant",
          "superellipse-table-b619": "Bàn SUPERELLIPSE B619",
          "usm-haller-cabinet-oxc": "USM HALLER Cabinet, OxC",
          "drop-chair-3110": "Ghế DROP - Model 3110",
          "panthella-table-mini-lamp": "PANTHELLA TABLE MINI Table Lamp",
        },
      },
      distributorFooter: {
        videoTitle: "Video nanoHome Summer Sale",
        label: "Độc quyền phân phối",
        headlinePrefix: "nanoHome là đơn vị độc quyền phân phối",
        headlineSuffix: "tại Việt Nam",
        address: "675 - 677 Điện Biên Phủ, Phường Thạnh Mỹ Tây, Quận Bình Thạnh, TP. Hồ Chí Minh",
        hours: "9:00 - 18:00 (Từ Thứ Hai đến Chủ Nhật)",
        hotline: "Hotline: (+84) 33 948 7632",
        cta: "Xem chi tiết",
      },
    },
    footer: {
      copyright: "© 2026 nanoHome. All rights reserved.",
      productHeading: "Sản phẩm",
      usmHaller: "USM Haller",
      usmKitos: "USM Kitos",
      accessories: "Phụ kiện",
      serviceHeading: "Dịch vụ",
      designConsultation: "Tư vấn thiết kế",
      installation: "Lắp đặt",
      warranty: "Bảo hành",
      contactHeading: "Liên hệ",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
  },
  en: {
    common: {
      brandName: "nanoHome",
      closeAnnouncement: "Close announcement",
      openCart: "Open cart",
      switchLanguageAriaLabel: (label) => `Switch to ${label}`,
      primaryNavigation: "Primary navigation",
      previousProducts: "Previous products",
      nextProducts: "Next products",
      previousCatalogs: "Previous catalogs",
      nextCatalogs: "Next catalogs",
      previousGallery: "Previous gallery",
      nextGallery: "Next gallery",
      goTo: "Go to",
    },
    header: {
      announcement: "nanoHome is the exclusive authorized USM retailer in Vietnam.",
      visitLink: "Visit nanoHome",
      wishlist: "Wishlist",
      bookConsultation: "Book Consultation",
      chooseLanguage: "Choose language",
    },
    hero: {
      swissMadeBadge: "SWISS MADE",
      taglineLine1: "Timeless standards.",
      taglineLine2: "Design for every space.",
      description: "USM Haller is the symbol of simplicity, flexibility, and sustainability — your companion today and tomorrow.",
      cta: "Explore USM",
      learnMore: "Learn More",
      colorPopTitle: "USM Color Pop",
      featuredProductName: "Red USM Cabinet",
      featuredProductCategory: "USM modular cabinet",
      videoTitle: "SWISS\nMADE",
      qrCodeAlt: "QR Code",
      playVideo: "Play video",
    },
    promotions: {
      heading: "Special Offers",
      dateFrom: "From: 15/06/2026",
      dateTo: "To: 05/07/2026",
      preOrderDiscount: "Pre-order & Save",
      discountPercent: "20%",
      discountDescription: "Discount on USM pre-orders",
      consultationHeading: "Project Consultation",
      consultationDescription: "Free design and layout solutions with our specialists.",
    },
    swissMade: {
      heading: "SWISS MADE",
      subtitle: "A guarantee for your living space",
      description: "Over 140 years of Swiss craftsmanship refined into every detail of USM Haller. Durable, precise, and timeless — to accompany you in every living space.",
      sinceLabel: "SINCE",
      sinceYear: "1965",
      sinceDescription: "100% manufactured and imported from Switzerland",
      precisionEngineering: "PRECISION\nENGINEERING",
      precisionDescription: "Precision engineering, lasting quality",
      modularDesign: "MODULAR\nDESIGN",
      modularDescription: "Flexible and adaptable to any space",
    },
    products: {
      label: "Products",
      heading: "Featured Products",
      listings: [
        {
          name: "USM HALLER Cabinet, O3",
          description: "USM HALLER O3 cabinet, W773 x D373 x H1090 mm, metal, Pure White.",
        },
        {
          name: "USM HALLER Cabinet, O2xC2",
          description: "USM HALLER O2xC2 cabinet, W1523 x D373 x H565 mm, metal, Pure Orange.",
        },
        {
          name: "USM HALLER Cabinet, C2xO2",
          description: "USM HALLER C2xO2 office cabinet, W1523 x D373 x H565 mm, metal.",
        },
        {
          name: "USM HALLER Cabinet, C2xC2",
          description: "USM HALLER C2xC2 cabinet, W1523 x D373 x H740 mm, metal, Ruby Red.",
        },
        {
          name: "USM HALLER Cabinet, CxO Wide",
          description: "USM HALLER CxO Wide cabinet, W773 x D373 x H740 mm, metal, Gentian Blue.",
        },
        {
          name: "USM Haller Cabinet, O3xC3",
          description: "USM HALLER O3xOC Low cabinet, W2273 x D373 x H565 mm, metal.",
        },
        {
          name: "USM HALLER Cabinet, C3xC3",
          description: "USM HALLER C3xC3 cabinet, W2273 x D373 x H740 mm, metal, Beige.",
        },
        {
          name: "USM HALLER Cabinet, CxO",
          description: "USM HALLER CxO cabinet, W523 x D373 x H565 mm, metal, Golden Yellow.",
        },
      ],
      viewDetail: "ORDER",
      getConsultation: "Get Consultation",
      carouselPositionLabel: "Product carousel position",
      goToProduct: (index) => `Go to product ${index}`,
    },
    exclusive: {
      label: "Exclusive Distribution",
      brandName: "nanoHome",
      title: "Exclusive partner\nof USM in Vietnam",
      description: "Experience, consult, and receive authentic service from nanoHome — bringing Swiss-standard interior solutions to your living space.",
      cta: "Explore USM",
    },
    showroom: {
      label: "Exclusive Distribution",
      titleLine1: "nanoHome",
      titleLine2: "Experience USM firsthand\nin Vietnam",
      cta: "Explore USM",
      exclusiveLabel: "EXCLUSIVE DISTRIBUTION",
      exclusiveTitle: "nanoHome is the exclusive retailer of USM Haller, Authorized by USM in Vietnam",
      addressLabel: "Address",
      address: "675 - 677 Dien Bien Phu, Thanh My Tay Ward (Ward 25, Old Binh Thanh District), Ho Chi Minh City.",
      addressShort: "675 - 677 Dien Bien Phu, Thanh My Tay Ward, Binh Thanh District, Ho Chi Minh City",
      hoursLabel: "Opening Hours",
      hoursWeekday: "Mon - Sat: 9:00 - 18:00",
      hoursWeekdayShort: "9:00 - 18:00 (Monday to Sunday)",
      hoursSunday: "Sunday: 10:00 - 16:00",
      experienceDescription: "Experience USM Haller products in person and receive expert consultation",
      bookVisit: "Book a Visit",
      paragraph1: "nanoHome is the authorized distributor of USM in Vietnam.",
      paragraph2: "At nanoHome Gallery & Module Cafe, customers can directly explore the USM Haller product lines, experience the materials, color palette, module configurations, and how USM is applied in real living spaces.",
      paragraph3: "A space for those who love timeless design, value quality, and seek interior solutions built to last.",
    },
    highlights: {
      authentic: {
        title: "100% Authentic",
        copy: "Imported and exclusively distributed in Vietnam.",
      },
      warranty: {
        title: "Expert Team",
        copy: "USM-trained specialists ready to advise on configuration, installation, and expansion.",
      },
      consult: {
        title: "Delivery & Installation",
        copy: "Delivery, on-site installation, and detailed usage guidance included.",
      },
      target: {
        title: "Real Experience",
        copy: "Visit our showroom to see components, colors, materials, and mechanisms firsthand.",
      },
    },
    gallery: {
      label: "USM HALLER SYSTEM",
      heading: "USM in Vietnam",
      description: "Discover beautiful living and working spaces with USM Haller in Vietnam",
      viewMore: "View More Photos",
      imageAlt: "USM gallery view",
      carouselAriaLabel: "USM gallery carousel",
    },
    catalog: {
      label: "Catalog",
      heading: "Explore collections\nand solutions from USM",
      cta: "Explore USM",
      catalogButton: "View Catalog",
      catalogAlt: "USM catalog",
    },
    whyUsm: {
      label: "USM HALLER SYSTEM",
      heading: "Why own\nUSM HALLER?",
      description: "USM products are crafted from carefully selected materials with precision engineering — delivering durability, flexibility, and timeless beauty.",
      chromeFrame: { title: "Chrome-Plated Steel Frame", desc: "Shiny, durable, corrosion-resistant" },
      modularStructure: { title: "Modular Structure", desc: "Flexible module design. Easy to expand, modify, and reuse" },
      colorPalette: { title: "Diverse Color Palette", desc: "Flexibly mix to match your style" },
    },
    contact: {
      label: "CONTACT FORM",
      heading: "Contact for Consultation &\nUSM Installation",
      description: "Book a consultation with our specialists for flexible, sustainable interior design solutions for your space",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      messageLabel: "Message",
      messagePlaceholder: "Please leave a message",
      submit: "Send Information",
      submitting: "Submitting...",
      success: "Thank you! Your information has been submitted successfully.",
      error: "Something went wrong. Please try again.",
      hotlineLabel: "Hotline",
      hotlineNumber: "(+84) 33 948 7632",
      hotlineHours: "Monday to Saturday | 9AM - 6PM",
      emailContactLabel: "Email",
      emailContactAddress: "info@nanohome.vn",
      emailResponse: "Reply within 24h",
      websiteLabel: "Website",
      websiteUrl: "https://www.nanohome.vn/",
      websiteDescription: "Explore solutions and inspiration from USM",
      showroomLabel: "Showroom",
      showroomName: "nanoHome Gallery Saigon",
      showroomAddress: "675 - 677 Dien Bien Phu, Thanh My Tay Ward (Ward 25, Old Binh Thanh District), Ho Chi Minh City.",
    },
    scrollModal: {
      title: "USM Haller pre-order offer.",
      description: "Get 20% off Pre-order purchases from 15/06/2026 to 05/07/2026.",
      validity: "From 15/06/2026 to 05/07/2026",
      name: "Full name",
      phone: "Phone number",
      email: "Email",
      namePlaceholder: "John Smith",
      phonePlaceholder: "0901234567",
      emailPlaceholder: "you@example.com",
      submit: "Claim offer now",
      submitting: "Submitting...",
      successTitle: "Thank you!",
      successDescription: "We have received your request. Our consultants will contact you within 24 hours.",
      errorGeneric: "Something went wrong. Please try again or contact us directly.",
      errorName: "Please enter your full name",
      errorPhone: "Please enter your phone number",
      errorPhoneFormat: "Phone number is invalid (9-11 digits)",
      errorEmail: "Please enter your email",
      errorEmailFormat: "Email is invalid",
      close: "Close",
    },
    cartModal: {
      title: "Register for consultation",
      collapsedTitle: "CLAIM OFFER NOW",
      collapsedCta: "CLICK HERE",
      description: "Leave your details to receive configuration advice for USM shelving and cabinets",
      name: "Full name",
      phone: "Phone number",
      email: "Email",
      namePlaceholder: "Enter your full name",
      phonePlaceholder: "Enter your phone number",
      emailPlaceholder: "Enter your email",
      submit: "Order now",
      submitting: "Submitting...",
      successTitle: "Thank you!",
      successDescription: "Your consultation request has been sent successfully. We will contact you as soon as possible.",
      errorGeneric: "Something went wrong. Please try again.",
      errorName: "Please enter your full name",
      errorPhone: "Please enter your phone number",
      errorPhoneFormat: "Phone number is invalid (9-11 digits)",
      errorEmail: "Please enter your email",
      errorEmailFormat: "Email is invalid",
      close: "Close",
      cartTitle: "Cart",
      cartEmpty: "Your cart is empty.",
      retailPrice: "Retail price",
      preorderPrice: "Pre-order price",
      subtotal: "Subtotal",
      total: "Total",
      deleteTotal: "Clear all",
      deleteItem: "Remove",
    },
    home: {
      notice: {
        announcement: "nanoHome is the sole exclusive retailer of USM products in Vietnam.",
        link: "Visit nanoHome",
        closeAriaLabel: "Close notice",
      },
      navigation: {
        logoAlt: "nanoHome",
        exploreCta: "Explore now",
        languageSelectorAriaLabel: "Choose language",
        languageOptionAriaLabel: (label) => `Switch to ${label}`,
      },
      hero: {
        imageAlt: "nanoHome interior",
      },
      saleStrip: {
        backgroundAlt: "Sale background pattern",
        summer: "SUMMER",
        sale: "SALE",
        upTo: "UP TO",
        off: "OFF",
        countdown: {
          days: "DAYS",
          hours: "HOURS",
          minutes: "MINUTES",
          seconds: "SECONDS",
        },
        cta: "Explore now",
      },
      featuredDeals: {
        heading: "Featured Deals",
        subtitle: "Highlighted offers",
        cta: "View products",
        imageTitles: {
          "/home_lifestyle_new/lifestyle_1.png": "SERIES 7 Chair - Model 3107",
          "/home_lifestyle_new/lifestyle_2.png": "USM HALLER Cabinet, CxO Wide",
          "/home_lifestyle_new/lifestyle_3.png": "USM HALLER TROLLEY, O3",
          "/home_lifestyle_new/lifestyle_4.png": "PH 5 ORIGINAL SIZE Pendant",
          "/home_lifestyle_new/lifestyle_5.png": "DROP Chair - Model 3110",
          "/home_lifestyle_new/lifestyle_6.png": "USM HALLER Cabinet, CxO Wide",
          "/home_lifestyle_new/lifestyle_7.png": "SERIES 7 Chair - Model 3107",
          "/home_lifestyle_new/lifestyle_8.png": "PH 5 ORIGINAL SIZE Pendant",
        },
      },
      saleList: {
        heading: "Summer Sale List",
        subtitle: "Product list",
        previousAriaLabel: "Previous products",
        nextAriaLabel: "Next products",
        offerCta: "View offer",
        consultationCta: "Get consultation",
        productNames: {
          "usm-haller-cabinet-cxo-wide": "USM HALLER Cabinet, CxO Wide",
          "usm-haller-trolley-o3": "USM HALLER TROLLEY, O3",
          "series-7-chair": "SERIES 7 Chair",
          "ph5-original-size-pendant": "PH 5 ORIGINAL SIZE Pendant",
          "superellipse-table-b619": "SUPERELLIPSE B619 Table",
          "usm-haller-cabinet-oxc": "USM HALLER Cabinet, OxC",
          "drop-chair-3110": "DROP Chair - Model 3110",
          "panthella-table-mini-lamp": "PANTHELLA TABLE MINI Table Lamp",
        },
      },
      distributorFooter: {
        videoTitle: "nanoHome Summer Sale video",
        label: "Exclusive distribution",
        headlinePrefix: "nanoHome is the exclusive distributor of",
        headlineSuffix: "in Vietnam",
        address: "675 - 677 Dien Bien Phu, Thanh My Tay Ward, Binh Thanh District, Ho Chi Minh City",
        hours: "9:00 - 18:00 (Monday to Sunday)",
        hotline: "Hotline: (+84) 33 948 7632",
        cta: "View details",
      },
    },
    footer: {
      copyright: "© 2026 nanoHome. All rights reserved.",
      productHeading: "Products",
      usmHaller: "USM Haller",
      usmKitos: "USM Kitos",
      accessories: "Accessories",
      serviceHeading: "Services",
      designConsultation: "Design Consultation",
      installation: "Installation",
      warranty: "Warranty",
      contactHeading: "Contact",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
  },
  ko: {
    common: {
      brandName: "nanoHome",
      closeAnnouncement: "알림 닫기",
      openCart: "장바구니 열기",
      switchLanguageAriaLabel: (label) => `${label}로 변경`,
      primaryNavigation: "주 네비게이션",
      previousProducts: "이전 제품",
      nextProducts: "다음 제품",
      previousCatalogs: "이전 카탈로그",
      nextCatalogs: "다음 카탈로그",
      previousGallery: "이전 갤러리",
      nextGallery: "다음 갤러리",
      goTo: "이동",
    },
    header: {
      announcement: "nanoHome은 베트남 유일의 USM 공식 리테일러입니다.",
      visitLink: "nanoHome 방문하기",
      wishlist: "위시리스트",
      bookConsultation: "상담 예약",
      chooseLanguage: "언어 선택",
    },
    hero: {
      swissMadeBadge: "SWISS MADE",
      taglineLine1: "시간을 초월한 기준.",
      taglineLine2: "모든 공간을 위한 디자인.",
      description: "USM Haller는 단순함, 유연함, 지속 가능성의 상징입니다 — 오늘과 내일을 함께합니다.",
      cta: "USM 알아보기",
      learnMore: "자세히 보기",
      colorPopTitle: "USM Color Pop",
      featuredProductName: "레드 USM 캐비닛",
      featuredProductCategory: "USM 모듈러 캐비닛",
      videoTitle: "SWISS\nMADE",
      qrCodeAlt: "QR 코드",
      playVideo: "영상 재생",
    },
    promotions: {
      heading: "특별 혜택",
      dateFrom: "시작: 2026/06/15",
      dateTo: "종료: 2026/07/15",
      preOrderDiscount: "사전 주문 할인",
      discountPercent: "20%",
      discountDescription: "USM 사전 주문 할인 혜택",
      consultationHeading: "프로젝트 상담",
      consultationDescription: "전문가와 함께하는 무료 디자인 및 레이아웃 솔루션.",
    },
    swissMade: {
      heading: "SWISS MADE",
      subtitle: "생활 공간을 위한 보증",
      description: "140년 이상의 스위스 장인 정신이 USM Haller의 모든 디테일에 담겨 있습니다. 내구성, 정밀함, 그리고 시대를 초월한 아름다움 — 모든 생활 공간에서 함께합니다.",
      sinceLabel: "SINCE",
      sinceYear: "1965",
      sinceDescription: "100% 스위스에서 생산 및 수입",
      precisionEngineering: "PRECISION\nENGINEERING",
      precisionDescription: "정밀한 공학, 오래 지속되는 품질",
      modularDesign: "MODULAR\nDESIGN",
      modularDescription: "어떤 공간에도 유연하게 적응",
    },
    products: {
      label: "Products",
      heading: "추천 제품",
      listings: [
        {
          name: "USM HALLER 캐비닛, O3",
          description: "USM HALLER O3 캐비닛, W773 x D373 x H1090 mm, 메탈, Pure White.",
        },
        {
          name: "USM HALLER 캐비닛, O2xC2",
          description: "USM HALLER O2xC2 캐비닛, W1523 x D373 x H565 mm, 메탈, Pure Orange.",
        },
        {
          name: "USM HALLER 캐비닛, C2xO2",
          description: "USM HALLER C2xO2 오피스 캐비닛, W1523 x D373 x H565 mm, 메탈.",
        },
        {
          name: "USM HALLER 캐비닛, C2xC2",
          description: "USM HALLER C2xC2 캐비닛, W1523 x D373 x H740 mm, 메탈, Ruby Red.",
        },
        {
          name: "USM HALLER 캐비닛, CxO Wide",
          description: "USM HALLER CxO Wide 캐비닛, W773 x D373 x H740 mm, 메탈, Gentian Blue.",
        },
        {
          name: "USM Haller 캐비닛, O3xC3",
          description: "USM HALLER O3xOC Low 캐비닛, W2273 x D373 x H565 mm, 메탈.",
        },
        {
          name: "USM HALLER 캐비닛, C3xC3",
          description: "USM HALLER C3xC3 캐비닛, W2273 x D373 x H740 mm, 메탈, Beige.",
        },
        {
          name: "USM HALLER 캐비닛, CxO",
          description: "USM HALLER CxO 캐비닛, W523 x D373 x H565 mm, 메탈, Golden Yellow.",
        },
      ],
      viewDetail: "주문하기",
      getConsultation: "상담 신청",
      carouselPositionLabel: "제품 carousel 위치",
      goToProduct: (index) => `${index}번 제품으로 이동`,
    },
    exclusive: {
      label: "독점 유통",
      brandName: "nanoHome",
      title: "USM의 베트남\n독점 파트너",
      description: "nanoHome에서 정품 서비스와 상담을 경험하세요 — 스위스 기준의 인테리어 솔루션을 제공합니다.",
      cta: "USM 알아보기",
    },
    showroom: {
      label: "독점 유통",
      titleLine1: "nanoHome",
      titleLine2: "베트남에서 USM을\n직접 경험하세요",
      cta: "USM 알아보기",
      exclusiveLabel: "독점 유통",
      exclusiveTitle: "nanoHome은 USM의 공인 독점 판매처입니다 (베트남 내 Authorized by USM)",
      addressLabel: "주소",
      address: "675 - 677 Dien Bien Phu, Thanh My Tay Ward (Ward 25, Old Binh Thanh District), Ho Chi Minh City.",
      addressShort: "675 - 677 Dien Bien Phu, Thanh My Tay Ward, Binh Thanh District, Ho Chi Minh City",
      hoursLabel: "영업 시간",
      hoursWeekday: "월 - 토: 9:00 - 18:00",
      hoursWeekdayShort: "9:00 - 18:00 (월요일 - 일요일)",
      hoursSunday: "일요일: 10:00 - 16:00",
      experienceDescription: "USM Haller 제품을 직접 경험하고 전문가 상담을 받아보세요",
      bookVisit: "방문 예약",
      paragraph1: "nanoHome은 베트남 내 USM 공인 유통처입니다.",
      paragraph2: "nanoHome Gallery & Module Cafe에서 고객은 USM Haller 제품 라인을 직접 살펴보고, 소재, 컬러 팔레트, 모듈 구성과 실제 생활 공간에서의 USM 적용 사례를 경험할 수 있습니다.",
      paragraph3: "시간이 지나도 변하지 않는 디자인과 품질을 사랑하는 분들을 위한 공간입니다.",
    },
    highlights: {
      authentic: {
        title: "100% 정품",
        copy: "베트남 독점 수입 및 유통.",
      },
      warranty: {
        title: "전문가 팀",
        copy: "USM 교육을 수료한 전문가가 구성, 설치, 확장을 도와드립니다.",
      },
      consult: {
        title: "배송 및 설치",
        copy: "배송, 현장 설치, 그리고 상세한 사용 가이드를 제공합니다.",
      },
      target: {
        title: "직접 체험",
        copy: "쇼룸에서 부품, 색상, 소재, 작동 방식을 직접 확인하세요.",
      },
    },
    gallery: {
      label: "USM HALLER SYSTEM",
      heading: "베트남의 USM",
      description: "베트남에서 USM Haller와 함께하는 아름다운 생활 및 업무 공간을 발견하세요",
      viewMore: "더 많은 사진 보기",
      imageAlt: "USM 갤러리 뷰",
      carouselAriaLabel: "USM 갤러리 carousel",
    },
    catalog: {
      label: "Catalog",
      heading: "USM의 컬렉션과\n솔루션을 발견하세요",
      cta: "USM 알아보기",
      catalogButton: "카탈로그 보기",
      catalogAlt: "USM 카탈로그",
    },
    whyUsm: {
      label: "USM HALLER SYSTEM",
      heading: "왜 USM HALLER를\n소유해야 할까요?",
      description: "USM 제품은 엄선된 소재와 정밀한 기술로 만들어져 내구성, 유연함, 시대를 초월한 아름다움을 선사합니다.",
      chromeFrame: { title: "크롬 도금 강철 프레임", desc: "광택, 내구성, 내식성" },
      modularStructure: { title: "모듈러 구조", desc: "유연한 모듈 설계. 확장, 변경, 재사용이 용이" },
      colorPalette: { title: "다양한 컬러 팔레트", desc: "취향에 맞게 유연하게 조합" },
    },
    contact: {
      label: "CONTACT FORM",
      heading: "상담 및\nUSM 설치 문의",
      description: "전문가와 상담하여 공간을 위한 유연하고 지속 가능한 인테리어 솔루션을 받아보세요",
      nameLabel: "성함",
      namePlaceholder: "성함을 입력하세요",
      phoneLabel: "전화번호",
      phonePlaceholder: "전화번호를 입력하세요",
      emailLabel: "이메일",
      emailPlaceholder: "이메일을 입력하세요",
      messageLabel: "메시지",
      messagePlaceholder: "메시지를 남겨주세요",
      submit: "정보 전송",
      submitting: "전송 중...",
      success: "감사합니다! 정보가 성공적으로 전송되었습니다.",
      error: "오류가 발생했습니다. 다시 시도해 주세요.",
      hotlineLabel: "핫라인",
      hotlineNumber: "(+84) 33 948 7632",
      hotlineHours: "월요일 ~ 토요일 | 9AM - 6PM",
      emailContactLabel: "이메일",
      emailContactAddress: "info@nanohome.vn",
      emailResponse: "24시간 내 회신",
      websiteLabel: "웹사이트",
      websiteUrl: "https://www.nanohome.vn/",
      websiteDescription: "USM의 솔루션과 영감을 발견하세요",
      showroomLabel: "쇼룸",
      showroomName: "nanoHome Gallery Saigon",
      showroomAddress: "675 - 677 Dien Bien Phu, Thanh My Tay Ward (Ward 25, Old Binh Thanh District), Ho Chi Minh City.",
    },
    scrollModal: {
      title: "USM Haller 사전 주문 혜택.",
      description: "2026년 6월 15일부터 7월 5일까지 사전 주문 시 20% 혜택을 받으세요.",
      validity: "2026.06.15 ~ 2026.07.05",
      name: "성함",
      phone: "전화번호",
      email: "이메일",
      namePlaceholder: "홍길동",
      phonePlaceholder: "0901234567",
      emailPlaceholder: "you@example.com",
      submit: "혜택 신청하기",
      submitting: "전송 중...",
      successTitle: "감사합니다!",
      successDescription: "요청이 접수되었습니다. 상담팀이 24시간 이내에 연락드리겠습니다.",
      errorGeneric: "오류가 발생했습니다. 다시 시도하거나 직접 문의해 주세요.",
      errorName: "성함을 입력해 주세요",
      errorPhone: "전화번호를 입력해 주세요",
      errorPhoneFormat: "전화번호가 올바르지 않습니다 (9-11자리)",
      errorEmail: "이메일을 입력해 주세요",
      errorEmailFormat: "이메일이 올바르지 않습니다",
      close: "닫기",
    },
    cartModal: {
      title: "상담 신청",
      collapsedTitle: "지금 혜택 받기",
      collapsedCta: "CLICK HERE",
      description: "USM 수납장 구성 상담을 위해 정보를 남겨 주세요",
      name: "성함",
      phone: "전화번호",
      email: "이메일",
      namePlaceholder: "성함을 입력하세요",
      phonePlaceholder: "전화번호를 입력하세요",
      emailPlaceholder: "이메일을 입력하세요",
      submit: "지금 주문하기",
      submitting: "전송 중...",
      successTitle: "감사합니다!",
      successDescription: "상담 요청이 성공적으로 전송되었습니다. 빠른 시간 내에 연락드리겠습니다.",
      errorGeneric: "오류가 발생했습니다. 다시 시도해 주세요.",
      errorName: "성함을 입력해 주세요",
      errorPhone: "전화번호를 입력해 주세요",
      errorPhoneFormat: "전화번호가 올바르지 않습니다 (9-11자리)",
      errorEmail: "이메일을 입력해 주세요",
      errorEmailFormat: "이메일이 올바르지 않습니다",
      close: "닫기",
      cartTitle: "장바구니",
      cartEmpty: "장바구니가 비어 있습니다.",
      retailPrice: "소매가",
      preorderPrice: "사전 주문가",
      subtotal: "소계",
      total: "총계",
      deleteTotal: "전체 삭제",
      deleteItem: "삭제",
    },
    home: {
      notice: {
        announcement: "nanoHome은 베트남 내 유일한 USM 공식 독점 판매처입니다.",
        link: "nanoHome 방문하기",
        closeAriaLabel: "알림 닫기",
      },
      navigation: {
        logoAlt: "nanoHome",
        exploreCta: "지금 살펴보기",
        languageSelectorAriaLabel: "언어 선택",
        languageOptionAriaLabel: (label) => `${label}로 변경`,
      },
      hero: {
        imageAlt: "nanoHome 인테리어",
      },
      saleStrip: {
        backgroundAlt: "세일 배경 패턴",
        summer: "SUMMER",
        sale: "SALE",
        upTo: "최대",
        off: "할인",
        countdown: {
          days: "일",
          hours: "시간",
          minutes: "분",
          seconds: "초",
        },
        cta: "지금 살펴보기",
      },
      featuredDeals: {
        heading: "Featured Deals",
        subtitle: "주요 혜택",
        cta: "제품 보기",
        imageTitles: {
          "/home_lifestyle_new/lifestyle_1.png": "SERIES 7 의자 - Model 3107",
          "/home_lifestyle_new/lifestyle_2.png": "USM HALLER 캐비닛, CxO Wide",
          "/home_lifestyle_new/lifestyle_3.png": "USM HALLER TROLLEY, O3",
          "/home_lifestyle_new/lifestyle_4.png": "PH 5 ORIGINAL SIZE Pendant",
          "/home_lifestyle_new/lifestyle_5.png": "DROP 의자 - Model 3110",
          "/home_lifestyle_new/lifestyle_6.png": "USM HALLER 캐비닛, CxO Wide",
          "/home_lifestyle_new/lifestyle_7.png": "SERIES 7 의자 - Model 3107",
          "/home_lifestyle_new/lifestyle_8.png": "PH 5 ORIGINAL SIZE Pendant",
        },
      },
      saleList: {
        heading: "Summer Sale List",
        subtitle: "제품 목록",
        previousAriaLabel: "이전 제품",
        nextAriaLabel: "다음 제품",
        offerCta: "혜택 보기",
        consultationCta: "상담 신청",
        productNames: {
          "usm-haller-cabinet-cxo-wide": "USM HALLER 캐비닛, CxO Wide",
          "usm-haller-trolley-o3": "USM HALLER TROLLEY, O3",
          "series-7-chair": "SERIES 7 의자",
          "ph5-original-size-pendant": "PH 5 ORIGINAL SIZE Pendant",
          "superellipse-table-b619": "SUPERELLIPSE B619 테이블",
          "usm-haller-cabinet-oxc": "USM HALLER 캐비닛, OxC",
          "drop-chair-3110": "DROP 의자 - Model 3110",
          "panthella-table-mini-lamp": "PANTHELLA TABLE MINI 테이블 램프",
        },
      },
      distributorFooter: {
        videoTitle: "nanoHome Summer Sale 영상",
        label: "독점 유통",
        headlinePrefix: "nanoHome은",
        headlineSuffix: "의 베트남 독점 유통사입니다",
        address: "675 - 677 Dien Bien Phu, Thanh My Tay Ward, Binh Thanh District, Ho Chi Minh City",
        hours: "9:00 - 18:00 (월요일 - 일요일)",
        hotline: "Hotline: (+84) 33 948 7632",
        cta: "자세히 보기",
      },
    },
    footer: {
      copyright: "© 2026 nanoHome. All rights reserved.",
      productHeading: "제품",
      usmHaller: "USM Haller",
      usmKitos: "USM Kitos",
      accessories: "액세서리",
      serviceHeading: "서비스",
      designConsultation: "디자인 상담",
      installation: "설치",
      warranty: "보증",
      contactHeading: "연락처",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
  },
};

export function getDictionary(lang: Language): Dictionary {
  return dictionaries[lang];
}

export const languages: { code: Language; label: string }[] = [
  { code: "vi", label: "VI" },
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
];

export const STORAGE_KEY = "nanohome_lang_v1";
