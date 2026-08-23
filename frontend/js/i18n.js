'use strict';
/* ============================================================
   E-SHOPIA MAROC — i18n.js v3 (FULL UPGRADE)
   150+ clés | FR / AR / EN | RTL auto | Prix + Dates
   ============================================================ */
const i18n = (()=>{

const T = {
fr:{
  nav_search_ph:"Rechercher produits, marques, modèles…",
  nav_cart:"Panier",nav_login:"Se connecter",nav_account:"Mon compte",
  nav_all:"Tout",nav_wishlist:"Favoris",nav_track:"Suivre ma commande",
  add_to_cart:"Ajouter au panier",buy_now:"Commander maintenant",
  see_more:"Voir plus",see_all:"Voir tout",back:"Retour",
  confirm:"Confirmer",cancel:"Annuler",save:"Enregistrer",
  search:"Rechercher",send:"Envoyer",copy:"Copier",copied:"Copié !",
  loading:"Chargement…",retry:"Réessayer",
  in_stock:"En stock",out_of_stock:"Rupture de stock",
  low_stock:"Stock limité",units_left:"unités restantes",
  free_delivery:"Livraison gratuite dès 129 DH",
  free_delivery_short:"Livraison gratuite",
  delivery_24h:"Livraison 24h",delivery_48h:"Livraison 24–48h",
  delivery_72h:"Livraison 48–72h",
  cod:"Paiement à la livraison",cod_short:"COD",
  cod_desc:"Vous payez en cash à la réception — aucun prépaiement requis.",
  delivery_free_from:"Gratuite dès",delivery_fee:"Frais de livraison",
  cart_title:"Mon Panier",cart_empty:"Votre panier est vide",
  cart_empty_sub:"Découvrez nos produits et ajoutez vos favoris",
  cart_total:"Total",cart_subtotal:"Sous-total",
  cart_checkout:"Passer la commande",cart_continue:"Continuer mes achats",
  cart_items:"article(s)",cart_remove:"Retirer",cart_qty:"Quantité",
  checkout_title:"Informations de livraison",checkout_summary:"Récapitulatif",
  field_name:"Nom complet",field_name_ph:"Prénom et Nom",
  field_phone:"Téléphone",field_phone_ph:"06XXXXXXXX",
  field_city:"Ville",field_city_ph:"Sélectionner votre ville",
  field_address:"Adresse complète",field_address_ph:"Numéro, rue, quartier…",
  field_notes:"Notes (optionnel)",field_notes_ph:"Instructions spéciales…",
  btn_order:"Confirmer ma commande",order_placed:"Commande en cours…",
  order_success:"Commande confirmée ! Nous vous rappellerons sous peu.",
  order_number:"Numéro de commande",order_next_steps:"Prochaines étapes",
  order_step1:"Notre équipe vous rappelle pour confirmer",
  order_step2:"Livraison sous",order_step3:"Payez en cash à la réception",
  trust_cod:"Paiement à la livraison",trust_return:"Retour 7 jours",
  trust_reviews:"4 200+ clients satisfaits",
  section_flash:"⚡ Ventes Flash du Jour",section_featured:"Produits En Vedette",
  section_bestsellers:"Meilleures Ventes",section_new:"Nouveautés",
  section_combos:"Offres Bundle",section_categories:"Parcourir par Catégorie",
  section_reviews:"Avis Vérifiés",section_trending:"Tendances du Moment",
  section_affiliate:"Gagnez de l'argent en recommandant nos produits",
  flash_ends:"Se termine dans",
  toast_added:"Produit ajouté au panier !",toast_removed:"Produit retiré",
  toast_ordered:"Commande confirmée !",toast_copied:"Lien copié !",
  toast_error:"Une erreur s'est produite",toast_login_ok:"Connexion réussie !",
  toast_register_ok:"Compte créé ! Bienvenue 🎉",
  toast_wishlist_add:"Ajouté aux favoris ❤️",toast_wishlist_rm:"Retiré des favoris",
  product_desc:"Description",product_specs:"Spécifications",
  product_reviews:"Avis",product_related:"Produits similaires",
  product_sold:"vendus",product_views:"vues",
  product_share:"Partager",product_compare:"Comparer",rating_label:"sur 5",
  track_title:"Suivre ma commande",
  track_label:"Numéro de commande ou téléphone",
  track_ph:"ESH-XXXXXXXX ou 06XXXXXXXX",
  track_btn:"Rechercher ma commande",
  track_hint:"Le numéro vous a été envoyé par WhatsApp après votre commande.",
  track_not_found:"Commande introuvable",track_error:"Erreur de connexion",
  track_offline:"Mode hors ligne",track_step1:"Commande reçue",
  track_step2:"Commande confirmée",track_step3:"Expédiée",track_step4:"Livrée",
  track_cancelled:"Annulée",track_refused:"Refusée",track_contact:"Pour toute question",
  aff_title:"Programme Affilié",aff_join:"Rejoindre le programme",
  aff_earn:"Gagnez",aff_commission:"de commission par vente",
  aff_link:"Votre lien de parrainage",aff_clicks:"Clics",aff_orders:"Commandes",
  aff_earned:"Commissions gagnées",aff_balance:"Solde disponible",
  aff_withdraw:"Demander le virement",aff_rank:"Votre rang",
  aff_tier:"Niveau",aff_leaderboard:"Classement",
  aff_share_wa:"Partager sur WhatsApp",aff_share_fb:"Partager sur Facebook",
  account_orders:"Mes commandes",account_wishlist:"Mes favoris",
  account_profile:"Mon profil",account_logout:"Déconnexion",
  account_score:"Score client",account_points:"Points fidélité",
  account_no_orders:"Aucune commande pour le moment",
  auth_login_title:"Connexion",auth_register_title:"Créer un compte",
  auth_email:"Email",auth_password:"Mot de passe",
  auth_forgot:"Mot de passe oublié ?",
  auth_no_account:"Pas encore de compte ?",auth_has_account:"Déjà un compte ?",
  auth_login_btn:"Se connecter",auth_register_btn:"Créer mon compte",
  footer_about:"À propos",footer_contact:"Contact",
  footer_affiliate:"Programme Affilié",footer_terms:"CGU",
  footer_privacy:"Confidentialité",footer_faq:"FAQ",
  footer_delivery:"Livraison & délais",footer_returns:"Retours & échanges",
  footer_newsletter:"Newsletter",footer_nl_ph:"votre@email.com",
  footer_nl_btn:"S'inscrire",
  footer_nl_desc:"Recevez nos meilleures offres directement dans votre boîte mail.",
  footer_payment:"Paiement accepté",footer_copyright:"Tous droits réservés.",
  cat_all:"Tout",cat_electronics:"Électronique",
  cat_computers:"Informatique & Bureau",cat_phones:"Accessoires Téléphone",
  cat_home:"Maison & Cuisine",cat_fashion:"Mode",cat_beauty:"Beauté & Soins",
  cat_sport:"Sport & Fitness",cat_auto:"Auto & Moto",cat_gaming:"Gaming",
  cat_deals:"Offres Spéciales",
  badge_top:"Top",badge_new:"Nouveau",badge_flash:"Flash",
  badge_promo:"Promo",badge_sold_x:"vendus",
  price_free:"Gratuit",price_dh:"DH",
  loading_products:"Chargement des produits…",
  no_results:"Aucun produit trouvé",no_results_sub:"Essayez de modifier vos filtres",
  sort_by:"Trier par",sort_default:"Popularité",
  sort_price_asc:"Prix croissant",sort_price_desc:"Prix décroissant",
  sort_rating:"Meilleures notes",sort_discount:"Meilleures remises",
  filter_title:"Filtres",filter_price:"Prix maximum",
  filter_rating:"Note minimum",filter_stock:"En stock uniquement",
  filter_discount:"En promotion",filter_reset:"Réinitialiser",
  whatsapp_help:"Besoin d'aide ?",
  newsletter_ok:"Inscription réussie ! Merci 🎉",newsletter_err:"Email invalide",
  scroll_top:"Retour en haut",
},

ar:{
  nav_search_ph:"ابحث عن منتجات، ماركات، موديلات…",
  nav_cart:"السلة",nav_login:"تسجيل الدخول",nav_account:"حسابي",
  nav_all:"الكل",nav_wishlist:"المفضلة",nav_track:"تتبع طلبي",
  add_to_cart:"أضف إلى السلة",buy_now:"اشتري الآن",
  see_more:"رؤية المزيد",see_all:"عرض الكل",back:"رجوع",
  confirm:"تأكيد",cancel:"إلغاء",save:"حفظ",
  search:"بحث",send:"إرسال",copy:"نسخ",copied:"تم النسخ !",
  loading:"جاري التحميل…",retry:"إعادة المحاولة",
  in_stock:"متوفر في المخزن",out_of_stock:"نفذ من المخزن",
  low_stock:"كمية محدودة",units_left:"قطعة متبقية",
  free_delivery:"توصيل مجاني من 129 درهم",
  free_delivery_short:"توصيل مجاني",
  delivery_24h:"توصيل خلال 24 ساعة",delivery_48h:"توصيل 24–48 ساعة",
  delivery_72h:"توصيل 48–72 ساعة",
  cod:"الدفع عند الاستلام",cod_short:"COD",
  cod_desc:"تدفع نقداً عند استلام طلبك — لا دفع مسبق.",
  delivery_free_from:"مجاني من",delivery_fee:"رسوم التوصيل",
  cart_title:"سلة المشتريات",cart_empty:"سلتك فارغة",
  cart_empty_sub:"اكتشف منتجاتنا وأضف ما يعجبك",
  cart_total:"المجموع",cart_subtotal:"المجموع الفرعي",
  cart_checkout:"إتمام الطلب",cart_continue:"مواصلة التسوق",
  cart_items:"منتج",cart_remove:"إزالة",cart_qty:"الكمية",
  checkout_title:"معلومات التوصيل",checkout_summary:"ملخص الطلب",
  field_name:"الاسم الكامل",field_name_ph:"الاسم الأول والأخير",
  field_phone:"رقم الهاتف",field_phone_ph:"06XXXXXXXX",
  field_city:"المدينة",field_city_ph:"اختر مدينتك",
  field_address:"العنوان الكامل",field_address_ph:"الرقم، الشارع، الحي…",
  field_notes:"ملاحظات (اختياري)",field_notes_ph:"تعليمات خاصة للتوصيل…",
  btn_order:"تأكيد الطلب",order_placed:"جاري تسجيل الطلب…",
  order_success:"تم تأكيد طلبك! سنتصل بك قريباً.",
  order_number:"رقم الطلب",order_next_steps:"الخطوات التالية",
  order_step1:"فريقنا سيتصل بك لتأكيد الطلب",
  order_step2:"التوصيل خلال",order_step3:"ادفع نقداً عند الاستلام",
  trust_cod:"الدفع عند الاستلام",trust_return:"إرجاع خلال 7 أيام",
  trust_reviews:"+4200 عميل راضٍ",
  section_flash:"⚡ عروض اليوم المحدودة",section_featured:"منتجات مميزة",
  section_bestsellers:"الأكثر مبيعاً",section_new:"وصل حديثاً",
  section_combos:"عروض مجمعة",section_categories:"تصفح حسب الفئة",
  section_reviews:"تقييمات موثقة",section_trending:"الأكثر رواجاً",
  section_affiliate:"اربح المال بالتوصية بمنتجاتنا",
  flash_ends:"ينتهي خلال",
  toast_added:"تمت إضافة المنتج إلى السلة!",toast_removed:"تمت إزالة المنتج",
  toast_ordered:"تم تأكيد طلبك!",toast_copied:"تم نسخ الرابط!",
  toast_error:"حدث خطأ ما",toast_login_ok:"تم تسجيل الدخول بنجاح!",
  toast_register_ok:"تم إنشاء الحساب! مرحباً بك 🎉",
  toast_wishlist_add:"أضيف إلى المفضلة ❤️",toast_wishlist_rm:"أُزيل من المفضلة",
  product_desc:"الوصف",product_specs:"المواصفات",
  product_reviews:"التقييمات",product_related:"منتجات مشابهة",
  product_sold:"مُباع",product_views:"مشاهدة",
  product_share:"مشاركة",product_compare:"مقارنة",rating_label:"من 5",
  track_title:"تتبع طلبي",track_label:"رقم الطلب أو رقم الهاتف",
  track_ph:"ESH-XXXXXXXX أو 06XXXXXXXX",track_btn:"البحث عن طلبي",
  track_hint:"رقم الطلب أُرسل إليك عبر واتساب بعد تأكيد الطلب.",
  track_not_found:"الطلب غير موجود",track_error:"خطأ في الاتصال",
  track_offline:"وضع عدم الاتصال",track_step1:"تم استلام الطلب",
  track_step2:"تم تأكيد الطلب",track_step3:"تم شحن الطلب",track_step4:"تم التوصيل",
  track_cancelled:"ملغى",track_refused:"مرفوض",track_contact:"للتواصل معنا",
  aff_title:"برنامج الإحالة",aff_join:"الانضمام للبرنامج",
  aff_earn:"اكسب",aff_commission:"عمولة على كل عملية بيع",
  aff_link:"رابط الإحالة الخاص بك",aff_clicks:"النقرات",aff_orders:"الطلبات",
  aff_earned:"العمولات المكتسبة",aff_balance:"الرصيد المتاح",
  aff_withdraw:"طلب سحب",aff_rank:"ترتيبك",aff_tier:"المستوى",
  aff_leaderboard:"لوحة الشرف",
  aff_share_wa:"مشاركة عبر واتساب",aff_share_fb:"مشاركة على فيسبوك",
  account_orders:"طلباتي",account_wishlist:"قائمة الرغبات",
  account_profile:"ملفي الشخصي",account_logout:"تسجيل الخروج",
  account_score:"تقييم العميل",account_points:"نقاط الولاء",
  account_no_orders:"لا توجد طلبات حتى الآن",
  auth_login_title:"تسجيل الدخول",auth_register_title:"إنشاء حساب",
  auth_email:"البريد الإلكتروني",auth_password:"كلمة المرور",
  auth_forgot:"نسيت كلمة المرور؟",
  auth_no_account:"ليس لديك حساب؟",auth_has_account:"لديك حساب بالفعل؟",
  auth_login_btn:"تسجيل الدخول",auth_register_btn:"إنشاء حسابي",
  footer_about:"من نحن",footer_contact:"اتصل بنا",
  footer_affiliate:"برنامج الإحالة",footer_terms:"الشروط والأحكام",
  footer_privacy:"سياسة الخصوصية",footer_faq:"الأسئلة الشائعة",
  footer_delivery:"التوصيل والمواعيد",footer_returns:"الإرجاع والاستبدال",
  footer_newsletter:"النشرة الإخبارية",footer_nl_ph:"بريدك@الإلكتروني.com",
  footer_nl_btn:"اشتراك",
  footer_nl_desc:"احصل على أفضل عروضنا مباشرة في بريدك.",
  footer_payment:"طرق الدفع المقبولة",footer_copyright:"جميع الحقوق محفوظة.",
  cat_all:"الكل",cat_electronics:"الإلكترونيات",
  cat_computers:"الكمبيوتر والمكتب",cat_phones:"ملحقات الهاتف",
  cat_home:"المنزل والمطبخ",cat_fashion:"الموضة",cat_beauty:"الجمال والعناية",
  cat_sport:"الرياضة واللياقة",cat_auto:"السيارات والدراجات",
  cat_gaming:"الألعاب",cat_deals:"العروض الخاصة",
  badge_top:"الأفضل",badge_new:"جديد",badge_flash:"فلاش",
  badge_promo:"عرض",badge_sold_x:"مُباع",
  price_free:"مجاني",price_dh:"درهم",
  loading_products:"جاري تحميل المنتجات…",
  no_results:"لا توجد منتجات",no_results_sub:"حاول تعديل الفلاتر",
  sort_by:"ترتيب حسب",sort_default:"الأكثر شعبية",
  sort_price_asc:"السعر: من الأقل",sort_price_desc:"السعر: من الأعلى",
  sort_rating:"الأعلى تقييماً",sort_discount:"أعلى خصم",
  filter_title:"الفلاتر",filter_price:"الحد الأقصى للسعر",
  filter_rating:"الحد الأدنى للتقييم",filter_stock:"المتوفر فقط",
  filter_discount:"المخفضة فقط",filter_reset:"إعادة ضبط",
  whatsapp_help:"هل تحتاج مساعدة؟",
  newsletter_ok:"تم الاشتراك بنجاح! شكراً 🎉",newsletter_err:"بريد إلكتروني غير صحيح",
  scroll_top:"العودة للأعلى",
},

en:{
  nav_search_ph:"Search products, brands, models…",
  nav_cart:"Cart",nav_login:"Sign in",nav_account:"My account",
  nav_all:"All",nav_wishlist:"Wishlist",nav_track:"Track my order",
  add_to_cart:"Add to cart",buy_now:"Buy now",
  see_more:"See more",see_all:"See all",back:"Back",
  confirm:"Confirm",cancel:"Cancel",save:"Save",
  search:"Search",send:"Send",copy:"Copy",copied:"Copied!",
  loading:"Loading…",retry:"Retry",
  in_stock:"In stock",out_of_stock:"Out of stock",
  low_stock:"Limited stock",units_left:"units left",
  free_delivery:"Free delivery from 129 MAD",
  free_delivery_short:"Free delivery",
  delivery_24h:"24h delivery",delivery_48h:"24–48h delivery",
  delivery_72h:"48–72h delivery",
  cod:"Cash on delivery",cod_short:"COD",
  cod_desc:"Pay cash when you receive your order — no prepayment required.",
  delivery_free_from:"Free from",delivery_fee:"Delivery fee",
  cart_title:"My Cart",cart_empty:"Your cart is empty",
  cart_empty_sub:"Discover our products and add your favorites",
  cart_total:"Total",cart_subtotal:"Subtotal",
  cart_checkout:"Checkout",cart_continue:"Continue shopping",
  cart_items:"item(s)",cart_remove:"Remove",cart_qty:"Quantity",
  checkout_title:"Delivery information",checkout_summary:"Order summary",
  field_name:"Full name",field_name_ph:"First and Last name",
  field_phone:"Phone",field_phone_ph:"06XXXXXXXX",
  field_city:"City",field_city_ph:"Select your city",
  field_address:"Full address",field_address_ph:"Number, street, neighborhood…",
  field_notes:"Notes (optional)",field_notes_ph:"Special delivery instructions…",
  btn_order:"Confirm my order",order_placed:"Processing your order…",
  order_success:"Order confirmed! We will call you shortly.",
  order_number:"Order number",order_next_steps:"Next steps",
  order_step1:"Our team will call you to confirm",
  order_step2:"Delivery within",order_step3:"Pay cash upon delivery",
  trust_cod:"Cash on delivery",trust_return:"7-day returns",
  trust_reviews:"4,200+ happy customers",
  section_flash:"⚡ Flash Deals Today",section_featured:"Featured Products",
  section_bestsellers:"Best Sellers",section_new:"New Arrivals",
  section_combos:"Bundle Offers",section_categories:"Browse by Category",
  section_reviews:"Verified Reviews",section_trending:"Trending Now",
  section_affiliate:"Earn money recommending our products",
  flash_ends:"Ends in",
  toast_added:"Product added to cart!",toast_removed:"Product removed",
  toast_ordered:"Order confirmed!",toast_copied:"Link copied!",
  toast_error:"Something went wrong",toast_login_ok:"Welcome back!",
  toast_register_ok:"Account created! Welcome 🎉",
  toast_wishlist_add:"Added to wishlist ❤️",toast_wishlist_rm:"Removed from wishlist",
  product_desc:"Description",product_specs:"Specifications",
  product_reviews:"Reviews",product_related:"Similar products",
  product_sold:"sold",product_views:"views",
  product_share:"Share",product_compare:"Compare",rating_label:"out of 5",
  track_title:"Track my order",track_label:"Order number or phone",
  track_ph:"ESH-XXXXXXXX or 06XXXXXXXX",track_btn:"Search my order",
  track_hint:"Your order number was sent via WhatsApp after ordering.",
  track_not_found:"Order not found",track_error:"Connection error",
  track_offline:"Offline mode",track_step1:"Order received",
  track_step2:"Order confirmed",track_step3:"Shipped",track_step4:"Delivered",
  track_cancelled:"Cancelled",track_refused:"Refused",track_contact:"Contact us",
  aff_title:"Affiliate Program",aff_join:"Join the program",
  aff_earn:"Earn",aff_commission:"commission per sale",
  aff_link:"Your referral link",aff_clicks:"Clicks",aff_orders:"Orders",
  aff_earned:"Commissions earned",aff_balance:"Available balance",
  aff_withdraw:"Request payout",aff_rank:"Your rank",aff_tier:"Level",
  aff_leaderboard:"Leaderboard",
  aff_share_wa:"Share on WhatsApp",aff_share_fb:"Share on Facebook",
  account_orders:"My orders",account_wishlist:"Wishlist",
  account_profile:"My profile",account_logout:"Sign out",
  account_score:"Client score",account_points:"Loyalty points",
  account_no_orders:"No orders yet",
  auth_login_title:"Sign in",auth_register_title:"Create account",
  auth_email:"Email",auth_password:"Password",
  auth_forgot:"Forgot password?",
  auth_no_account:"Don't have an account?",auth_has_account:"Already have an account?",
  auth_login_btn:"Sign in",auth_register_btn:"Create my account",
  footer_about:"About",footer_contact:"Contact",
  footer_affiliate:"Affiliate program",footer_terms:"Terms",
  footer_privacy:"Privacy policy",footer_faq:"FAQ",
  footer_delivery:"Shipping & timing",footer_returns:"Returns & exchanges",
  footer_newsletter:"Newsletter",footer_nl_ph:"your@email.com",
  footer_nl_btn:"Subscribe",
  footer_nl_desc:"Get our best deals delivered to your inbox.",
  footer_payment:"Accepted payment",footer_copyright:"All rights reserved.",
  cat_all:"All",cat_electronics:"Electronics",
  cat_computers:"Computers & Office",cat_phones:"Phone Accessories",
  cat_home:"Home & Kitchen",cat_fashion:"Fashion",cat_beauty:"Beauty & Care",
  cat_sport:"Sport & Fitness",cat_auto:"Auto & Moto",cat_gaming:"Gaming",
  cat_deals:"Special Offers",
  badge_top:"Top",badge_new:"New",badge_flash:"Flash",
  badge_promo:"Sale",badge_sold_x:"sold",
  price_free:"Free",price_dh:"MAD",
  loading_products:"Loading products…",
  no_results:"No products found",no_results_sub:"Try adjusting your filters",
  sort_by:"Sort by",sort_default:"Popularity",
  sort_price_asc:"Price: low to high",sort_price_desc:"Price: high to low",
  sort_rating:"Highest rated",sort_discount:"Best discount",
  filter_title:"Filters",filter_price:"Maximum price",
  filter_rating:"Minimum rating",filter_stock:"In stock only",
  filter_discount:"On sale only",filter_reset:"Reset filters",
  whatsapp_help:"Need help?",
  newsletter_ok:"Subscribed! Thank you 🎉",newsletter_err:"Invalid email",
  scroll_top:"Back to top",
},
};

/* ── Traduction noms catégories ─────────────────── */
const CAT_MAP={
  "Tout":{ar:"الكل",en:"All"},
  "Électronique":{ar:"الإلكترونيات",en:"Electronics"},
  "Informatique & Bureau":{ar:"الكمبيوتر والمكتب",en:"Computers & Office"},
  "Accessoires Téléphone":{ar:"ملحقات الهاتف",en:"Phone Accessories"},
  "Maison & Cuisine":{ar:"المنزل والمطبخ",en:"Home & Kitchen"},
  "Mode":{ar:"الموضة",en:"Fashion"},
  "Beauté & Soins":{ar:"الجمال والعناية",en:"Beauty & Care"},
  "Sport & Fitness":{ar:"الرياضة واللياقة",en:"Sport & Fitness"},
  "Auto & Moto":{ar:"السيارات والدراجات",en:"Auto & Moto"},
  "Gaming":{ar:"الألعاب",en:"Gaming"},
  "Offres Spéciales":{ar:"العروض الخاصة",en:"Special Offers"},
};

/* ── Traduction noms produits ───────────────────── */
const PROD_NAMES={
  1:{ar:"إيربودز برو 3 — إلغاء الضوضاء",en:"AirBuds Pro 3 — Active Noise Cancellation"},
  2:{ar:"ساعة ذكية فيتنس إليت GPS",en:"SmartWatch Fitness Elite GPS"},
  3:{ar:"باور بنك سليم 20000 مللي أمبير 65 واط",en:"PowerBank Ultra Slim 20000mAh 65W"},
  4:{ar:"روبوت مكنسة ليزر 4000 باسكال",en:"Robot Vacuum Laser 4000Pa Auto-Empty"},
  5:{ar:"كاميرا سيارة 4K مع GPS وواي فاي",en:"Dashcam 4K HDR GPS WiFi Night Vision"},
  6:{ar:"لوحة مفاتيح ميكانيكية RGB 87 مفتاح",en:"Mechanical Keyboard RGB 87 Cherry MX Blue"},
  7:{ar:"ساعة ذكية AMOLED أنيقة",en:"AMOLED Smart Watch Fashion Style"},
  8:{ar:"شاحن ماج سيف 3 في 1 — 15 واط",en:"MagSafe 3-in-1 15W Fast Charger"},
  9:{ar:"مكنسة كهربائية سايكلون 350 واط لاسلكية",en:"Cyclone Vacuum 350W Cordless 70min"},
  10:{ar:"جي بي إس سيارة 7 بوصة خرائط المغرب",en:"Car GPS 7 Inch HD Morocco Maps"},
  11:{ar:"شاشة محمولة 15.6 بوصة IPS Full HD",en:"Portable Monitor 15.6\" IPS Full HD USB-C"},
  12:{ar:"سوار لياقة SpO2 14 يوم AMOLED",en:"Fitness Band SpO2 14 Days AMOLED"},
  13:{ar:"حامل هاتف مغناطيسي 360 درجة للسيارة",en:"Magnetic Phone Holder 360° Car"},
  14:{ar:"سماعة جيمنج 7.1 سراوند RGB احترافية",en:"Gaming Headset 7.1 Surround RGB Pro"},
  15:{ar:"مكبر بلوتوث 360 درجة مقاوم للماء 18 ساعة",en:"Bluetooth Speaker 360° IPX7 18h"},
  16:{ar:"مصباح مكتب LED مضاد لإجهاد العيون 5 أوضاع",en:"LED Desk Lamp Anti-eye-strain 5 Modes"},
};

/* ── Core ───────────────────────────────────────── */
function detect(){
  const saved=localStorage.getItem('eshopia_lang');
  if(saved&&T[saved]) return saved;
  const br=navigator.language?.slice(0,2).toLowerCase();
  if(br==='ar') return 'ar';
  if(br==='en') return 'en';
  return 'fr';
}

let lang=detect();

function apply(l){
  lang=l;
  localStorage.setItem('eshopia_lang',l);
  const rtl=l==='ar';
  document.documentElement.setAttribute('lang',l);
  document.documentElement.setAttribute('dir',rtl?'rtl':'ltr');
  document.body.classList.toggle('rtl',rtl);

  if(rtl){
    if(!document.getElementById('cairo-font')){
      const lk=document.createElement('link');
      lk.id='cairo-font';lk.rel='stylesheet';
      lk.href='https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap';
      document.head.appendChild(lk);
    }
    document.body.style.setProperty('--fb',"'Cairo',sans-serif");
    document.body.style.setProperty('--fh',"'Cairo',sans-serif");
  } else {
    document.body.style.removeProperty('--fb');
    document.body.style.removeProperty('--fh');
  }

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    const v=T[l]?.[k]||T.fr[k];
    if(v) el.textContent=v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const k=el.getAttribute('data-i18n-ph');
    const v=T[l]?.[k]||T.fr[k];
    if(v) el.placeholder=v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
    const k=el.getAttribute('data-i18n-aria');
    const v=T[l]?.[k]||T.fr[k];
    if(v) el.setAttribute('aria-label',v);
  });
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('lang-active',b.dataset.lang===l);
  });
  document.querySelectorAll('[data-cat-fr]').forEach(el=>{
    const fr=el.getAttribute('data-cat-fr');
    el.textContent=l==='fr'?fr:(CAT_MAP[fr]?.[l]||fr);
  });
  document.dispatchEvent(new CustomEvent('eshopia:langchange',{detail:{lang:l}}));
}

function buildSwitcher(containerId){
  const el=document.getElementById(containerId);
  if(!el) return;
  el.innerHTML=`<div class="lang-sw" role="group">
    <button class="lang-btn${lang==='fr'?' lang-active':''}" data-lang="fr" onclick="i18n.set('fr')" title="Français">FR</button>
    <button class="lang-btn${lang==='ar'?' lang-active':''}" data-lang="ar" onclick="i18n.set('ar')" title="العربية" style="font-family:'Cairo',sans-serif">ع</button>
    <button class="lang-btn${lang==='en'?' lang-active':''}" data-lang="en" onclick="i18n.set('en')" title="English">EN</button>
  </div>`;
}

document.addEventListener('DOMContentLoaded',()=>apply(lang));

return {
  t:(k)=>T[lang]?.[k]||T.fr[k]||k,
  set:apply,
  get:()=>lang,
  price:(n)=>{
    const f=Number(n).toLocaleString(lang==='ar'?'ar-MA':'fr-MA');
    if(lang==='ar') return `${f} درهم`;
    if(lang==='en') return `${f} MAD`;
    return `${f} DH`;
  },
  date:(d)=>{
    const dt=d instanceof Date?d:new Date(d);
    const loc=lang==='ar'?'ar-MA':lang==='en'?'en-GB':'fr-MA';
    return dt.toLocaleDateString(loc,{day:'numeric',month:'long',year:'numeric'});
  },
  cat:(fr)=>lang==='fr'?fr:(CAT_MAP[fr]?.[lang]||fr),
  productName:(id,fallback)=>lang==='fr'?fallback:(PROD_NAMES[id]?.[lang]||fallback),
  buildSwitcher,
  CAT_MAP,
  PROD_NAMES,
};
})();
