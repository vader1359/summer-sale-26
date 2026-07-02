import React from "react";

export type Language = "vi" | "en" | "ko";

const CATEGORY_LABELS: Record<Language, Record<string, string>> = {
  vi: {
    Bàn: "Bàn",
    Kệ: "Kệ",
    Tủ: "Tủ",
    "Đèn": "Đèn",
    "Đèn bàn": "Đèn bàn",
    "Đèn thả": "Đèn thả",
    "Phụ kiện": "Phụ kiện",
    USM: "USM",
    Ghế: "Ghế",
  },
  en: {
    Bàn: "Table",
    Kệ: "Shelf",
    Tủ: "Cabinet",
    "Đèn": "Lighting",
    "Đèn bàn": "Table lamp",
    "Đèn thả": "Pendant lamp",
    "Phụ kiện": "Accessory",
    USM: "USM",
    Ghế: "Chair",
  },
  ko: {
    Bàn: "테이블",
    Kệ: "선반",
    Tủ: "캐비닛",
    "Đèn": "조명",
    "Đèn bàn": "테이블 램프",
    "Đèn thả": "펜던트 램프",
    "Phụ kiện": "액세서리",
    USM: "USM",
    Ghế: "의자",
  },
};

export interface PreorderSourceProductText {
  category: string;
  shortName: string;
  productName: string;
}

export interface PreorderLocalizedProductText {
  category: string;
  shortName: string;
  productName: string;
}

const PREORDER_PHRASE_TRANSLATIONS: Record<Exclude<Language, "vi">, Array<[RegExp, string]>> = {
  en: [
    [/Kệ nội thất văn phòng/g, "Office shelving"],
    [/Tủ nội thất văn phòng/g, "Office cabinet"],
    [/Tủ văn phòng/g, "Office cabinet"],
    [/Tủ bedside/g, "Bedside cabinet"],
    [/Tủ hồ sơ/g, "File cabinet"],
    [/Hộc tủ/g, "Drawer unit"],
    [/Chữ X/g, "X brace"],
    [/Kệ/g, "Shelf"],
    [/Tủ/g, "Cabinet"],
    [/Bàn Làm Việc/g, "Desk"],
    [/Bàn văn phòng/g, "Office desk"],
    [/Bàn ăn/g, "Dining table"],
    [/Bàn/g, "Table"],
    [/Đèn bàn/g, "Table lamp"],
    [/Đèn Thả/g, "Pendant lamp"],
    [/Đèn thả/g, "Pendant lamp"],
    [/Ghế Trẻ Em/g, "Children's chair"],
    [/Ghế trẻ em/g, "Children's chair"],
    [/Ghế Đẩu Cao/g, "High stool"],
    [/Ghế Xoay/g, "Swivel chair"],
    [/Ghế/g, "Chair"],
    [/Mẫu/g, "Model"],
    [/mẫu/g, "model"],
    [/hiệu/g, "brand"],
    [/kích thước/g, "dimensions"],
    [/Kích thước/g, "Dimensions"],
    [/Không Phụ Kiện/g, "without accessories"],
    [/không có tựa lưng/g, "without backrest"],
    [/không có điều chỉnh lên xuống/g, "without height adjustment"],
    [/bằng nhựa và kim loại/g, "plastic and metal"],
    [/Bằng kim loại và thủy tinh/g, "metal and glass"],
    [/bằng kim loại/g, "metal"],
    [/Bằng Kim loại/g, "metal"],
    [/Bằng kim loại/g, "metal"],
    [/Bằng khung Kim loại/g, "metal frame"],
    [/Kim Loại/g, "metal"],
    [/Chân bằng kim loại/g, "metal legs"],
    [/Bằng Da/g, "leather"],
    [/Thân Gỗ Veneer Tự Nhiên/g, "natural wood veneer shell"],
    [/thân natural veneer/g, "natural veneer shell"],
    [/Thân Gỗ Coloured Ash/g, "coloured ash wood shell"],
    [/thân gỗ Coloured Ash/g, "coloured ash wood shell"],
    [/Thân Gỗ/g, "wood shell"],
    [/thân gỗ/g, "wood shell"],
    [/Thân Plastic/g, "plastic shell"],
    [/Thân Lacquered/g, "lacquered shell"],
    [/Mặt Bàn ăn/g, "dining tabletop"],
    [/Mặt Bàn/g, "tabletop"],
    [/Mặt Fenix/g, "Fenix top"],
    [/mặt bàn/g, "tabletop"],
    [/Chân Sơn Tĩnh Điện/g, "powder-coated legs"],
    [/chân thép mạ/g, "chrome-plated steel legs"],
    [/Chân Thép Mạ/g, "chrome-plated steel legs"],
    [/Chân Thép/g, "steel legs"],
    [/Chân Chrome/g, "chrome legs"],
    [/Bọc Mặt Trước/g, "front upholstered"],
    [/Bọc mặt trước/g, "front upholstered"],
    [/bọc mặt trước/g, "front upholstered"],
    [/tay vịn/g, "armrests"],
    [/Mở Rộng/g, "extendable"],
    [/với/g, "with"],
    [/gồm/g, "including"],
    [/Khay Đóng/g, "closed trays"],
    [/Thẻ Nhãn/g, "label cards"],
    [/màu/g, "color"],
    [/Màu/g, "Color"],
    [/Trắng/g, "White"],
    [/trắng/g, "white"],
    [/Đen/g, "Black"],
    [/đen/g, "black"],
    [/Vàng/g, "Yellow"],
    [/Cam/g, "Orange"],
    [/Lục/g, "Green"],
    [/Xanh/g, "Blue"],
    [/Hồng/g, "Pink"],
    [/Đỏ/g, "Red"],
    [/Nâu/g, "Brown"],
    [/Bạc/g, "Silver"],
    [/Đồng/g, "Copper"],
    [/Óc Chó/g, "Walnut"],
    [/Dẻ Gai/g, "Beech"],
    [/Xám trung tính/g, "Mid-Gray"],
    [/dài/g, "length"],
    [/rộng/g, "width"],
    [/cao/g, "height"],
  ],
  ko: [
    [/Kệ nội thất văn phòng/g, "오피스 선반"],
    [/Tủ nội thất văn phòng/g, "오피스 캐비닛"],
    [/Tủ văn phòng/g, "오피스 캐비닛"],
    [/Tủ bedside/g, "베드사이드 캐비닛"],
    [/Tủ hồ sơ/g, "파일 캐비닛"],
    [/Hộc tủ/g, "서랍 유닛"],
    [/Chữ X/g, "X 브레이스"],
    [/Kệ/g, "선반"],
    [/Tủ/g, "캐비닛"],
    [/Bàn Làm Việc/g, "데스크"],
    [/Bàn văn phòng/g, "오피스 데스크"],
    [/Bàn ăn/g, "다이닝 테이블"],
    [/Bàn/g, "테이블"],
    [/Đèn bàn/g, "테이블 램프"],
    [/Đèn Thả/g, "펜던트 램프"],
    [/Đèn thả/g, "펜던트 램프"],
    [/Ghế Trẻ Em/g, "아동용 의자"],
    [/Ghế trẻ em/g, "아동용 의자"],
    [/Ghế Đẩu Cao/g, "하이 스툴"],
    [/Ghế Xoay/g, "스위블 체어"],
    [/Ghế/g, "의자"],
    [/Mẫu/g, "모델"],
    [/mẫu/g, "모델"],
    [/hiệu/g, "브랜드"],
    [/kích thước/g, "사이즈"],
    [/Kích thước/g, "사이즈"],
    [/Không Phụ Kiện/g, "액세서리 없음"],
    [/không có tựa lưng/g, "등받이 없음"],
    [/không có điều chỉnh lên xuống/g, "높이 조절 없음"],
    [/bằng nhựa và kim loại/g, "플라스틱 및 금속"],
    [/Bằng kim loại và thủy tinh/g, "금속 및 유리"],
    [/bằng kim loại/g, "금속"],
    [/Bằng Kim loại/g, "금속"],
    [/Bằng kim loại/g, "금속"],
    [/Bằng khung Kim loại/g, "금속 프레임"],
    [/Kim Loại/g, "금속"],
    [/Chân bằng kim loại/g, "금속 다리"],
    [/Bằng Da/g, "가죽"],
    [/Thân Gỗ Veneer Tự Nhiên/g, "천연 우드 베니어 쉘"],
    [/thân natural veneer/g, "천연 베니어 쉘"],
    [/Thân Gỗ Coloured Ash/g, "컬러드 애시 우드 쉘"],
    [/thân gỗ Coloured Ash/g, "컬러드 애시 우드 쉘"],
    [/Thân Gỗ/g, "우드 쉘"],
    [/thân gỗ/g, "우드 쉘"],
    [/Thân Plastic/g, "플라스틱 쉘"],
    [/Thân Lacquered/g, "래커드 쉘"],
    [/Mặt Bàn ăn/g, "다이닝 상판"],
    [/Mặt Bàn/g, "상판"],
    [/Mặt Fenix/g, "Fenix 상판"],
    [/mặt bàn/g, "상판"],
    [/Chân Sơn Tĩnh Điện/g, "분체 도장 다리"],
    [/chân thép mạ/g, "크롬 도금 스틸 다리"],
    [/Chân Thép Mạ/g, "크롬 도금 스틸 다리"],
    [/Chân Thép/g, "스틸 다리"],
    [/Chân Chrome/g, "크롬 다리"],
    [/Bọc Mặt Trước/g, "전면 업홀스터리"],
    [/Bọc mặt trước/g, "전면 업홀스터리"],
    [/bọc mặt trước/g, "전면 업홀스터리"],
    [/tay vịn/g, "팔걸이"],
    [/Mở Rộng/g, "확장형"],
    [/với/g, "포함"],
    [/gồm/g, "포함"],
    [/Khay Đóng/g, "닫힌 트레이"],
    [/Thẻ Nhãn/g, "라벨 카드"],
    [/màu/g, "색상"],
    [/Màu/g, "색상"],
    [/Trắng/g, "화이트"],
    [/trắng/g, "화이트"],
    [/Đen/g, "블랙"],
    [/đen/g, "블랙"],
    [/Vàng/g, "옐로우"],
    [/Cam/g, "오렌지"],
    [/Lục/g, "그린"],
    [/Xanh/g, "블루"],
    [/Hồng/g, "핑크"],
    [/Đỏ/g, "레드"],
    [/Nâu/g, "브라운"],
    [/Bạc/g, "실버"],
    [/Đồng/g, "코퍼"],
    [/Óc Chó/g, "월넛"],
    [/Dẻ Gai/g, "비치"],
    [/Xám trung tính/g, "미드 그레이"],
    [/dài/g, "길이"],
    [/rộng/g, "너비"],
    [/cao/g, "높이"],
  ],
};

function localizePreorderName(value: string, lang: Language): string {
  if (lang === "vi") return value;

  return PREORDER_PHRASE_TRANSLATIONS[lang].reduce(
    (localized, [pattern, replacement]) => localized.replace(pattern, replacement),
    value,
  );
}

export function localizePreorderCategory(category: string, lang: Language): string {
  return CATEGORY_LABELS[lang][category] ?? category;
}

export function localizePreorderProductText(
  product: PreorderSourceProductText,
  lang: Language,
): PreorderLocalizedProductText {
  return {
    category: localizePreorderCategory(product.category, lang),
    shortName: localizePreorderName(product.shortName, lang),
    productName: localizePreorderName(product.productName, lang),
  };
}

export interface PreorderTranslation {
  notificationBar: {
    text: React.ReactNode;
    ariaLabel: string;
  };
  wishlistAriaLabel: string;
  openCartAriaLabel: string;
  switchLangAriaLabel: (label: string) => string;
  navAriaLabel: string;
  logoHomeAriaLabel: string;
  hero: {
    sectionAriaLabel: string;
    title: React.ReactNode;
    description: React.ReactNode;
    offer: string;
    preorder: string;
    date: string;
    imageAlt: string;
  };
  trustBadges: {
    sectionAriaLabel: string;
    badge1: { top: string; bottom: string };
    badge2: { top: string; bottom: string };
    badge3: { top: string; bottom: string };
    badge4: { top: string; bottom: string };
    title: string;
    policyLine1: string;
    policyLine2: string;
    policyNote: string;
    paymentLine: string;
    detailsCta: string;
  };
  productToggle: {
    sectionAriaLabel: string;
    heading: string;
    preorder: string;
    instock: string;
  };
  productCard: {
    subtitle: string;
    retailPrice: string;
    preorderPrice: string;
    cta: string;
    addedToCart: string;
  };
  lifestyleCaptions: string[];
  brandFilter: {
    all: string;
    fritzHansen: string;
    usm: string;
    louisPoulsen: string;
    sortAsc: string;
    sortDesc: string;
  };
  productGridAriaLabel: string;
  pagination: {
    navAriaLabel: string;
    goToPage: (page: number) => string;
  };
  commitSection: {
    title: string;
    desc: string;
    cta: string;
  };
  finalPolicy: {
    title: string;
    body: string;
    posterAlt: string;
  };
  footer: {
    exclusive: string;
    backToTop: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    productHeading: string;
    usmHaller: string;
    usmKitos: string;
    accessories: string;
    serviceHeading: string;
    designConsultation: string;
    installation: string;
    warranty: string;
    contactHeading: string;
    hotlineLabel: string;
    hotlineNumber: string;
    emailContactLabel: string;
    emailContactAddress: string;
    showroomLabel: string;
    showroomAddress: string;
    copyright: string;
  };
}

export const translations: Record<Language, PreorderTranslation> = {
  vi: {
    notificationBar: {
      text: (
        <span>
          nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.{" "}
          <a
            href="https://nanohome.vn"
            className="font-bold underline underline-offset-2 hover:text-[#C70500]"
          >
            Truy cập nanoHome
          </a>
        </span>
      ),
      ariaLabel: "Đóng thông báo"
    },
    wishlistAriaLabel: "Danh sách yêu thích",
    openCartAriaLabel: "Mở giỏ hàng",
    switchLangAriaLabel: (label) => `Chuyển sang ngôn ngữ ${label}`,
    navAriaLabel: "Điều hướng chính",
    logoHomeAriaLabel: "Trang chủ nanoHome",
    hero: {
      sectionAriaLabel: "Giới thiệu chương trình đặt trước USM Haller",
      title: (
        <>
          Ưu đãi đặt trước
          <br />
          USM Haller.
        </>
      ),
      description: (
        <>
          Nhận ưu đãi <strong className="font-bold">20%</strong> cho các đơn hàng
          <br className="hidden sm:block" />
          <span className="sm:inline"> </span>Pre-order từ 15/06/2026 đến 05/07/2026.
        </>
      ),
      offer: "ƯU ĐÃI",
      preorder: "PRE-ORDER",
      date: "Từ 15/06/2026 đến 05/07/2026",
      imageAlt: "Hệ tủ modular USM Haller màu xanh olive trưng bày trong không gian sống hiện đại"
    },
    trustBadges: {
      sectionAriaLabel: "Lợi ích khi đặt hàng trước",
      badge1: {
        top: "Thời gian sự kiện SUMMER SALE",
        bottom: "Từ 03/07/2026 đến 05/07/2026"
      },
      badge2: {
        top: "Hàng chính hãng 100%",
        bottom: "Nhập khẩu và phân phối độc quyền"
      },
      badge3: {
        top: "Đội ngũ chuyên sâu",
        bottom: "Chúng tôi là đơn vị đã được đào tạo"
      },
      badge4: {
        top: "Dịch vụ giao hàng và lắp đặt",
        bottom: "Hỗ trợ giao hàng và lắp đặt thiết bị"
      },
      title: "CHÍNH SÁCH ORDER",
      policyLine1: "Áp dụng mức giảm giá 20% trên giá bán lẻ và thanh toán 100% giá trị đơn hàng để đặt hàng chỉ từ ngày 15/6 đến hết 5/7/2026.",
      policyLine2: "Chương trình áp dụng cho các mẫu tiêu chuẩn của USM được tạo sẵn theo danh sách đính kèm hoặc các mẫu thiết kế riêng theo yêu cầu.",
      policyNote: "(Không áp dụng cho mua linh kiện lẻ, inos và các sản phẩm không phải tủ kệ USM)",
      paymentLine: "Khách hàng thanh toán 100% giá trị đơn hàng để đặt hàng",
      detailsCta: "Xem chi tiết"
    },
    productToggle: {
      sectionAriaLabel: "Bộ lọc loại sản phẩm",
      heading: "Chọn loại sản phẩm",
      preorder: "PRE - ORDER",
      instock: "HÀNG CÓ SẴN"
    },
    productCard: {
      subtitle: "Tủ USM Haller",
      retailPrice: "Giá bán lẻ",
      preorderPrice: "Giá pre-order",
      cta: "ĐẶT HÀNG NGAY",
      addedToCart: "Đã thêm ✓"
    },
    lifestyleCaptions: [
      "Không gian phòng khách với USM Haller TV Unit",
      "Phòng ngủ với tủ đầu giường USM Haller",
      "Phòng trẻ em với tủ USM Haller màu vàng",
      "Phòng ăn với tủ trưng bày USM Haller kính",
      "Góc giải trí với tủ lưu trữ bản ghi vinyl"
    ],
    brandFilter: {
      all: "Tất cả sản phẩm",
      fritzHansen: "FRITZ HANSEN",
      usm: "USM",
      louisPoulsen: "louis poulsen",
      sortAsc: "Sắp xếp theo: Tăng dần",
      sortDesc: "Sắp xếp theo: Giảm dần",
    },
    productGridAriaLabel: "Danh sách sản phẩm",
    pagination: {
      navAriaLabel: "Phân trang sản phẩm",
      goToPage: (page) => `Đi tới trang ${page}`
    },
    commitSection: {
      title: "Cam kết chính hãng 100%",
      desc: "Sản phẩm USM Haller nhập khẩu chính hãng, bảo hành theo tiêu chuẩn nhà sản xuất.",
      cta: "Liên hệ tư vấn"
    },
    finalPolicy: {
      title: "CHÍNH SÁCH BÁN HÀNG PRE-ORDER",
      body: `1. Thời gian áp dụng:
• Chương trình khuyến mãi diễn ra từ ngày lúc 9am, Thứ 6 ngày 03/07/2026 đến hết 11:59pm, Chủ nhật ngày 05/07/2026.
• Trường hợp Pre-Order USM: áp dụng đến hết 11:59pm, Chủ nhật ngày 05/07/2026.
• Showroom nanoHome Gallery mở cửa từ 09:00 đến 18:00 hằng ngày.

2. Điều khoản và Điều kiện chung:
• Chương trình chỉ áp dụng cho các sản phẩm được trưng bày và nằm trong chương trình khuyến mãi.
• Chương trình khuyến mãi này không đồng áp dụng với những chính sách bán hàng hay chương trình khuyến mãi khác.
• Khách hàng thanh toán 100% giá trị đơn hàng trước khi giao hàng và để giữ hàng. Bên Bán không giữ hàng khi chưa nhận được thanh toán 100% giá trị đơn hàng.
• Chỉ cấp nhận thanh toán bằng hình thức:
  Chuyển khoản ngân hàng (Bank Transfer)
  Thẻ tín dụng/thẻ ghi nợ (Credit/Debit Card) – Visa, MasterCard (Không chấp nhận thẻ Amex)

• Khách hàng vui lòng kiểm tra kỹ tình trạng của sản phẩm trước khi mua hàng và thanh toán.
• Không áp dụng bảo hành cho những sản phẩm trong chương trình khuyến mãi và trưng bày tại địa điểm bán hàng của sự kiện.
• Không áp dụng chính sách đổi trả, hoàn tiền sau khi mua hàng với những sản phẩm trong chương trình khuyến mãi.
• Giao hàng ngay sau khi mua hàng, không lưu kho. Thời gian giao hàng do Bên Bán chủ động sắp xếp theo lịch của Bên Bán và thông báo cho khách hàng chậm nhất 1 ngày trước ngày giao hàng.
• Phí giao hàng và lắp đặt: 500,000 VNĐ/lần giao hàng & lắp đặt cho các khu vực Nội thành TP.HCM (Không bao gồm: Nhà Bè, Hóc Môn, Củ Chi, Cần Giờ, Bình Chánh, Quận 12).
• Các tỉnh thành khác và các khu vực Nhà Bè, Hóc Môn, Củ Chi, Cần Giờ, Bình Chánh, Quận 12 (cũ): chi phí sẽ được báo sau khi làm việc với đơn vị vận chuyển và lắp đặt hoặc khách hàng có thể tự nhận hàng tại cửa hàng của nanoHome.`,
      posterAlt: "Poster chương trình Summer Sale"
    },
    footer: {
      exclusive: "— Đơn vị phân phối độc quyền USM tại Việt Nam.",
      backToTop: "Back to top ↑",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      productHeading: "Sản phẩm",
      usmHaller: "USM Haller",
      usmKitos: "USM Kitos",
      accessories: "Phụ kiện",
      serviceHeading: "Dịch vụ",
      designConsultation: "Tư vấn thiết kế",
      installation: "Giao hàng & lắp đặt",
      warranty: "Bảo hành",
      contactHeading: "Liên hệ",
      hotlineLabel: "Hotline",
      hotlineNumber: "0909 000 000",
      emailContactLabel: "Email",
      emailContactAddress: "info@nanohome.vn",
      showroomLabel: "Showroom",
      showroomAddress: "Q.1, TP.HCM",
      copyright: "© 2026 nanoHome. All rights reserved."
    }
  },
  en: {
    notificationBar: {
      text: (
        <span>
          nanoHome is the sole exclusive retailer of USM products in Vietnam.{" "}
          <a
            href="https://nanohome.vn"
            className="font-bold underline underline-offset-2 hover:text-[#C70500]"
          >
            Visit nanoHome
          </a>
        </span>
      ),
      ariaLabel: "Close notification"
    },
    wishlistAriaLabel: "Wishlist",
    openCartAriaLabel: "Open cart",
    switchLangAriaLabel: (label) => `Switch to ${label}`,
    navAriaLabel: "Primary navigation",
    logoHomeAriaLabel: "nanoHome home",
    hero: {
      sectionAriaLabel: "USM Haller preorder hero",
      title: (
        <>
          Pre-order offers
          <br />
          USM Haller.
        </>
      ),
      description: (
        <>
          Get <strong className="font-bold">20%</strong> off for Pre-orders
          <br className="hidden sm:block" />
          <span className="sm:inline"> </span>from 15/06/2026 to 05/07/2026.
        </>
      ),
      offer: "OFFER",
      preorder: "PRE-ORDER",
      date: "From 15/06/2026 to 05/07/2026",
      imageAlt: "USM Haller modular cabinets in olive green displayed in a curated living space"
    },
    trustBadges: {
      sectionAriaLabel: "Preorder benefits",
      badge1: {
        top: "Pre-Order Offer Period",
        bottom: "From 15/06/2026 to 05/07/2026"
      },
      badge2: {
        top: "100% Authentic Product",
        bottom: "Exclusively imported and distributed"
      },
      badge3: {
        top: "Expert Team",
        bottom: "Professionally trained by USM"
      },
      badge4: {
        top: "Delivery & Installation",
        bottom: "Full shipping and installation support"
      },
      title: "ORDER POLICY",
      policyLine1: "A 20% discount applies to the retail price, with 100% order value paid to place an order from 15/6 through 5/7/2026 only.",
      policyLine2: "The program applies to standard USM models made according to the attached list or custom designs upon request.",
      policyNote: "(Not applicable to separate components, inos, or products that are not USM shelving/cabinet systems)",
      paymentLine: "Customers pay 100% of the order value to place the order",
      detailsCta: "View details"
    },
    productToggle: {
      sectionAriaLabel: "Product type selector",
      heading: "Select Product Type",
      preorder: "PRE - ORDER",
      instock: "IN STOCK"
    },
    productCard: {
      subtitle: "USM Haller Cabinet",
      retailPrice: "Retail price",
      preorderPrice: "Pre-order price",
      cta: "ORDER NOW",
      addedToCart: "Added ✓",
    },
    lifestyleCaptions: [
      "Living room space with USM Haller TV Unit",
      "Bedroom with USM Haller bedside table",
      "Children's room with yellow USM Haller cabinet",
      "Dining room with USM Haller glass display cabinet",
      "Entertainment corner with vinyl record storage"
    ],
    brandFilter: {
      all: "All products",
      fritzHansen: "FRITZ HANSEN",
      usm: "USM",
      louisPoulsen: "louis poulsen",
      sortAsc: "Sort by: Price low to high",
      sortDesc: "Sort by: Price high to low",
    },
    productGridAriaLabel: "Product grid",
    pagination: {
      navAriaLabel: "Product pagination",
      goToPage: (page) => `Go to page ${page}`
    },
    commitSection: {
      title: "100% Authentic Guarantee",
      desc: "USM Haller products are imported officially and come with manufacturer's warranty.",
      cta: "Contact for Consultation"
    },
    finalPolicy: {
      title: "PRE-ORDER SALES POLICY",
      body: `Effective period:
The promotion runs from 9am, Friday 03/07/2026 through 11:59pm, Sunday 05/07/2026.
For USM Pre-Order: valid until 11:59pm, Sunday 05/07/2026.
nanoHome Gallery showroom is open daily from 09:00 to 18:00.

Offer program:
2.1. Summer Display Sale program:
Discounts of up to 30% off retail prices apply to USM, Louis Poulsen, Fritz Hansen
The program applies only to USM, Louis Poulsen, Fritz Hansen products displayed at nanoHome Gallery and listed in the attached list;
This promotion cannot be combined with other sales policies or promotions.

2.2. USM Pre-Order:
A 20% discount applies to retail prices with 100% order value paid (deposits are not accepted);
The program applies only to USM STANDARD MODELS prepared according to the attached list.
Customers may choose colors from USM's 15-color palette;
This promotion cannot be combined with other sales policies or promotions.

2.3. Purchase cases outside the 2 programs above:
Case 1: Customers buy additional components to add to standard USM Pre-Order and USM Display Sale products:
Sales Dept. quotes additional components - accessories before 05/07 with a 20% discount, and customers must pay 100% for these additional components - accessories before 05/07.

Case 2: Customers adjust or create a new design from a standard USM model:
Customers must pay 30,000,000vnđ before 8/6 to purchase. Sales Dept. will design & quote before 05/07 with a 20% discount, and customers must pay 100% before 05/07.
If the customer's order value difference is lower than 30,000,000 vnđ, nanoHome will not refund the difference and will offset it against the customer's next order.

Case 3: Customers want to buy separate components for cabinets they already own:
Customers must pay 30,000,000vnđ before 05/07 to purchase. Sales Dept. will quote before 05/07 with a 20% discount, and customers must pay 100% before 05/07.
If the customer's order value difference is lower than 30,000,000vnđ, nanoHome will not refund the difference and will offset it against the customer's next order.

Case 4: NO sale of components in stock / NO sale of components already ordered and being imported.

Case 5: Customers buy products outside the sale program product list:

Customers may buy any product in the CLEARANCE program at the discount defined for CLEARANCE items (available on the website), with no additional promotion applied.

Customers who want to buy VITRA products: 15% discount off retail price.

Other cases require CA to request a decision from BOD

3. General Terms and Conditions:
The program applies only to displayed products included in the promotion.
This promotion cannot be combined with other sales policies or promotions.
Customers pay 100% of the order value before delivery and to reserve the product. The Seller does not reserve products before receiving 100% payment of the order value.
Accepted payment methods only:
Bank Transfer
Credit/Debit Card – Visa, MasterCard (Amex cards are not accepted)

Customers should carefully inspect the product condition before purchase and payment.
Warranty does not apply to products in the promotion and displayed at the event sales location.
Exchange, return, and refund policies do not apply after purchase for products in the promotion.
Delivery is made immediately after purchase, with no storage. Delivery timing is arranged by the Seller according to the Seller's schedule and notified to the customer no later than 1 day before delivery.
Delivery and installation fee: 500,000 VNĐ/per delivery & installation for inner Ho Chi Minh City areas (excluding: Nhà Bè, Hóc Môn, Củ Chi, Cần Giờ, Bình Chánh, District 12).
For other provinces/cities and Nhà Bè, Hóc Môn, Củ Chi, Cần Giờ, Bình Chánh, District 12: costs will be quoted after working with the transportation and installation provider, or customers may collect products at the nanoHome store`,
      posterAlt: "Summer Sale campaign poster"
    },
    footer: {
      exclusive: "— Exclusive distributor of USM in Vietnam.",
      backToTop: "Back to top ↑",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      productHeading: "Products",
      usmHaller: "USM Haller",
      usmKitos: "USM Kitos",
      accessories: "Accessories",
      serviceHeading: "Services",
      designConsultation: "Design Consultation",
      installation: "Delivery & Installation",
      warranty: "Warranty",
      contactHeading: "Contact",
      hotlineLabel: "Hotline",
      hotlineNumber: "0909 000 000",
      emailContactLabel: "Email",
      emailContactAddress: "info@nanohome.vn",
      showroomLabel: "Showroom",
      showroomAddress: "District 1, Ho Chi Minh City",
      copyright: "© 2026 nanoHome. All rights reserved."
    }
  },
  ko: {
    notificationBar: {
      text: (
        <span>
          nanoHome은 베트남 내 유일한 USM 공식 독점 유통사입니다.{" "}
          <a
            href="https://nanohome.vn"
            className="font-bold underline underline-offset-2 hover:text-[#C70500]"
          >
            nanoHome 방문하기
          </a>
        </span>
      ),
      ariaLabel: "알림 닫기"
    },
    wishlistAriaLabel: "위시리스트",
    openCartAriaLabel: "장바구니 열기",
    switchLangAriaLabel: (label) => `${label}로 변경`,
    navAriaLabel: "주 네비게이션",
    logoHomeAriaLabel: "nanoHome 홈",
    hero: {
      sectionAriaLabel: "USM Haller 사전 주문 히어로",
      title: (
        <>
          사전 주문 혜택
          <br />
          USM Haller.
        </>
      ),
      description: (
        <>
          2026년 6월 15일부터 7월 15일까지
          <br className="hidden sm:block" />
          사전 주문 시 <strong className="font-bold">20%</strong> 특별 혜택을 제공합니다.
        </>
      ),
      offer: "특별 혜택",
      preorder: "사전 주문",
      date: "2026.06.15 ~ 2026.07.05",
      imageAlt: "큐레이팅된 거실 공간에 전시된 올리브 그린 색상의 USM Haller 모듈러 캐비닛"
    },
    trustBadges: {
      sectionAriaLabel: "사전 주문 혜택",
      badge1: {
        top: "사전 주문 혜택 기간",
        bottom: "2026.06.15 ~ 2026.07.05"
      },
      badge2: {
        top: "100% 정품 보증",
        bottom: "공식 수입 및 독점 유통"
      },
      badge3: {
        top: "전문 상담 팀",
        bottom: "USM 본사 교육을 이수한 전문가 그룹"
      },
      badge4: {
        top: "전문 배송 및 설치",
        bottom: "안전한 배송 및 전문 설치 지원"
      },
      title: "주문 정책",
      policyLine1: "2026년 6월 15일부터 7월 5일까지 주문 시, 소매가 기준 20% 할인 혜택이 적용되며 주문 금액의 100% 결제가 필요합니다.",
      policyLine2: "본 프로그램은 첨부 목록의 USM 표준 모델 또는 요청에 따른 맞춤 디자인 모델에 적용됩니다.",
      policyNote: "(개별 부품, inos 및 USM 수납/선반 시스템이 아닌 제품에는 적용되지 않습니다)",
      paymentLine: "고객은 주문 접수를 위해 주문 금액의 100%를 결제합니다",
      detailsCta: "자세히 보기"
    },
    productToggle: {
      sectionAriaLabel: "제품 유형 선택기",
      heading: "제품 유형 선택",
      preorder: "PRE - ORDER",
      instock: "국내 재고 보유"
    },
    productCard: {
      subtitle: "USM Haller 수납장",
      retailPrice: "소매가",
      preorderPrice: "사전 주문가",
      cta: "지금 주문하기",
      addedToCart: "추가됨 ✓",
    },
    lifestyleCaptions: [
      "USM Haller TV 유닛을 배치한 거실 공간",
      "USM Haller 침대 협탁을 배치한 침실",
      "옐로우 USM Haller 수납장으로 꾸민 아이 방",
      "USM Haller 유리 장식장을 배치한 다이닝 룸",
      "바이닐 레코드를 보관한 엔터테인먼트 공간"
    ],
    brandFilter: {
      all: "모든 제품",
      fritzHansen: "FRITZ HANSEN",
      usm: "USM",
      louisPoulsen: "louis poulsen",
      sortAsc: "정렬: 낮은 가격순",
      sortDesc: "정렬: 높은 가격순",
    },
    productGridAriaLabel: "제품 그리드",
    pagination: {
      navAriaLabel: "제품 페이지네이션",
      goToPage: (page) => `${page}페이지로 이동`
    },
    commitSection: {
      title: "100% 정품 보증",
      desc: "정식 수입된 USM Haller 정품만을 취급하며 제조사 기준의 공식 보증 서비스를 제공합니다.",
      cta: "맞춤 상담 문의"
    },
    finalPolicy: {
      title: "프리오더 판매 정책",
      body: `적용 기간:
프로모션은 2026년 07월 03일 금요일 오전 9시부터 2026년 07월 05일 일요일 오후 11:59까지 진행됩니다.
USM Pre-Order의 경우: 2026년 07월 05일 일요일 오후 11:59까지 적용됩니다.
nanoHome Gallery 쇼룸은 매일 09:00부터 18:00까지 운영됩니다.

혜택 프로그램:
2.1. Summer Display Sale 프로그램:
USM, Louis Poulsen, Fritz Hansen 소매가 기준 최대 30% 할인이 적용됩니다
본 프로그램은 nanoHome Gallery 매장에 전시되어 있고 첨부 목록에 포함된 USM, Louis Poulsen, Fritz Hansen 제품에만 적용됩니다;
본 프로모션은 다른 판매 정책 또는 프로모션과 중복 적용되지 않습니다.

2.2. USM Pre-Order:
소매가 기준 20% 할인이 적용되며 주문 금액의 100% 결제가 필요합니다(계약금은 받지 않습니다);
본 프로그램은 첨부 목록에 따라 사전 구성된 USM 표준 모델에만 적용됩니다.
고객은 USM의 15가지 컬러 팔레트에서 색상을 선택할 수 있습니다;
본 프로모션은 다른 판매 정책 또는 프로모션과 중복 적용되지 않습니다.

2.3. 위 2개 프로그램 외 구매 사례:
사례 1: 고객이 표준 USM Pre-Order 및 USM Display Sale 제품에 추가 부품을 구매하여 장착하는 경우:
영업부는 05/07 이전에 추가 부품 - 액세서리를 20% 할인 가격으로 견적하며, 고객은 해당 추가 부품 - 액세서리 금액의 100%를 05/07 이전에 결제해야 합니다.

사례 2: 고객이 표준 USM 모델을 조정하거나 새로 제작하는 경우:
고객은 구매를 위해 8/6 이전에 30,000,000vnđ를 결제해야 합니다. 영업부는 05/07 이전에 디자인 및 견적을 제공하며 20% 할인이 적용되고, 고객은 05/07 이전에 100%를 결제해야 합니다.
고객이 구매한 주문 금액의 차액이 30,000,000 vnđ보다 낮은 경우 nanoHome은 차액을 환불하지 않고 고객의 다음 주문에 상계합니다.

사례 3: 고객이 이미 보유한 캐비닛용 개별 부품을 추가 구매하려는 경우:
고객은 구매를 위해 05/07 이전에 30,000,000vnđ를 결제해야 합니다. 영업부는 05/07 이전에 20% 할인 견적을 제공하며, 고객은 05/07 이전에 100%를 결제해야 합니다.
고객이 구매한 주문 금액의 차액이 30,000,000vnđ보다 낮은 경우 nanoHome은 차액을 환불하지 않고 고객의 다음 주문에 상계합니다.

사례 4: 재고 부품 판매 불가 / 이미 주문되어 수입 중인 부품 판매 불가.

사례 5: 고객이 세일 프로그램 제품 목록 외 제품을 구매하는 경우:

고객은 CLEARANCE 프로그램의 모든 제품을 CLEARANCE 품목 규정 할인율(웹사이트에 게시)에 따라 구매할 수 있으며, 추가 프로모션은 적용되지 않습니다.

VITRA 제품 구매를 원하는 고객: 소매가 기준 15% 할인.

기타 사례는 CA가 BOD의 결정 의견을 요청해야 합니다

3. 일반 이용 약관:
본 프로그램은 전시 제품 및 프로모션에 포함된 제품에만 적용됩니다.
본 프로모션은 다른 판매 정책 또는 프로모션과 중복 적용되지 않습니다.
고객은 배송 전 및 제품 보유를 위해 주문 금액의 100%를 결제해야 합니다. 판매자는 주문 금액의 100% 결제를 받기 전에는 제품을 보유하지 않습니다.
허용되는 결제 방식:
은행 송금 (Bank Transfer)
신용카드/체크카드 (Credit/Debit Card) – Visa, MasterCard (Amex 카드 불가)

고객은 구매 및 결제 전 제품 상태를 꼼꼼히 확인해 주시기 바랍니다.
프로모션 및 행사 판매 장소에 전시된 제품에는 보증이 적용되지 않습니다.
프로모션 제품 구매 후 교환, 반품, 환불 정책은 적용되지 않습니다.
구매 후 즉시 배송되며 보관은 불가합니다. 배송 시간은 판매자가 판매자 일정에 따라 주도적으로 조율하고 배송일 최소 1일 전 고객에게 안내합니다.
배송 및 설치비: 호치민시 도심 지역 1회 배송 및 설치당 500,000 VNĐ (제외 지역: Nhà Bè, Hóc Môn, Củ Chi, Cần Giờ, Bình Chánh, Quận 12).
기타 지방/도시 및 Nhà Bè, Hóc Môn, Củ Chi, Cần Giờ, Bình Chánh, Quận 12 지역: 운송 및 설치 업체와 협의 후 비용을 안내하거나 고객이 nanoHome 매장에서 직접 수령할 수 있습니다`,
      posterAlt: "Summer Sale 캠페인 포스터"
    },
    footer: {
      exclusive: "— 베트남 USM 독점 공식 유통사.",
      backToTop: "맨 위로 이동 ↑",
      facebook: "Facebook",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      productHeading: "제품",
      usmHaller: "USM Haller",
      usmKitos: "USM Kitos",
      accessories: "액세서리",
      serviceHeading: "서비스",
      designConsultation: "디자인 상담",
      installation: "배송 및 설치",
      warranty: "보증",
      contactHeading: "문의",
      hotlineLabel: "핫라인",
      hotlineNumber: "0909 000 000",
      emailContactLabel: "이메일",
      emailContactAddress: "info@nanohome.vn",
      showroomLabel: "쇼룸",
      showroomAddress: "호찌민시 1군",
      copyright: "© 2026 nanoHome. All rights reserved."
    }
  }
};
