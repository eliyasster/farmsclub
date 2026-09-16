/* Farmsclub bilingual switch — English ⇄ العربية.

   HOW IT WORKS. Nothing in the HTML needs marking up: the dictionary below is
   keyed by the exact English string as it appears on the page, and the engine
   swaps matching text nodes and attributes (aria-label, title, placeholder,
   data-tip) in place. It also reaches into the question helper's shadow DOM and
   re-runs when that widget adds new bubbles, so the Q&A tree translates too.

   TO EDIT A TRANSLATION: find the English on the left, change the Arabic.
   TO ADD NEW COPY: add the English exactly as written in the page, then the
   Arabic. Anything missing from the dictionary simply stays in English, so a
   half-finished translation never breaks a page.

   The choice is remembered in localStorage under 'fc-lang'. */
(() => {
  if (window.__fcI18n) return; window.__fcI18n = true;

  const AR = {
    /* — enquiry form fields & 360° tour chips — */
    'Check in': 'تاريخ الوصول',
    'Check out': 'تاريخ المغادرة',
    'Guests': 'عدد الضيوف',
    'Check-in date': 'تاريخ الوصول',
    'Check-out date': 'تاريخ المغادرة',
    'Number of guests': 'عدد الضيوف',
    'Bedroom': 'غرفة النوم',
    'Room': 'الغرفة',
    'Bathroom': 'الحمام',
    'Balcony': 'الشرفة',
    'View': 'المنظر',
    'Tour spots': 'أماكن الجولة',
    'Angles in this spot': 'الزوايا في هذا المكان',
    'Farmsclub — home': 'فارمزكلب — الصفحة الرئيسية',
    /* — brand, navigation, shared — */
    'Farmsclub': 'فارمزكلب',
    'Grand Haven': 'جراند هيفن',
    'Happy Haven': 'هابي هيفن',
    'Green Haven': 'جرين هيفن',
    'FAQs': 'الأسئلة الشائعة',
    'Contact': 'اتصل بنا',
    '360° tour': 'جولة 360°',
    'About the farm': 'عن المزرعة',
    'Before you come': 'قبل أن تأتي',
    'Other farms': 'مزارع أخرى',
    'Email': 'البريد الإلكتروني',
    'Office': 'المكتب',
    'Bookings': 'الحجوزات',
    'Address': 'العنوان',
    'Farm manager': 'مدير المزرعة',
    'Farmsclub Hospitality': 'فارمزكلب للضيافة',
    'Ras Al Khaimah': 'رأس الخيمة',
    'Ras Al Khaimah city': 'مدينة رأس الخيمة',
    'Ras Al Khaimah, United Arab Emirates': 'رأس الخيمة، الإمارات العربية المتحدة',
    'Sharjah, United Arab Emirates': 'الشارقة، الإمارات العربية المتحدة',
    'Kalba, Sharjah': 'كلباء، الشارقة',
    'Dubai': 'دبي',
    'Sharjah city': 'مدينة الشارقة',
    'Fujairah': 'الفجيرة',
    'Abu Dhabi': 'أبوظبي',
    '© 2026 Farmsclub Hospitality, UAE': '© 2026 فارمزكلب للضيافة، الإمارات',
    'Scan to WhatsApp us': 'امسح الرمز لمراسلتنا على واتساب',
    'Open in Google Maps & get directions': 'افتح في خرائط جوجل واحصل على الاتجاهات',
    'Your name': 'الاسم',
    'Phone': 'الهاتف',
    'Which farm and which dates': 'أي مزرعة وأي تواريخ',
    'Which farm and which dates?': 'أي مزرعة وأي تواريخ؟',
    'Dates and number of guests': 'التواريخ وعدد الضيوف',
    'Message us on WhatsApp': 'راسلنا على واتساب',
    'Ask the farm manager': 'اسأل مدير المزرعة',
    'Goes straight to the team who run this farm': 'يصل مباشرة إلى الفريق الذي يدير هذه المزرعة',
    'WhatsApp or call, 8am–10pm · stay@farmsclub.ae': 'واتساب أو هاتف، 8 صباحاً – 10 مساءً · stay@farmsclub.ae',
    'WhatsApp or call, 8am–10pm. Prices are given on the phone.': 'واتساب أو هاتف، 8 صباحاً – 10 مساءً. الأسعار تُعطى عبر الهاتف.',

    /* — landing page — */
    'Three farms · Kalba, Sharjah · Ras Al Khaimah': 'ثلاث مزارع · كلباء، الشارقة · رأس الخيمة',
    'Farmhouses you get to keep for the weekend.': 'مزارع خاصة تحتفظ بها طوال عطلة الأسبوع.',
    'Grand Haven, Happy Haven and Green Haven — pools, lawns, barbecue yards and animals, each handed over whole. Walk them in 360° before you call.': 'جراند هيفن وهابي هيفن وجرين هيفن — مسابح ومروج وساحات شواء وحيوانات، وكل مزرعة تُسلَّم لك كاملة. تجوّل فيها بتقنية 360° قبل أن تتصل.',
    'The portfolio': 'المزارع',
    'Every farm is booked whole — never shared, never by the room. A caretaker stays on site, the pool is cleaned the morning you arrive, and the animal yard is yours to help feed.': 'كل مزرعة تُحجز كاملة — لا مشاركة ولا حجز بالغرفة. يبقى الحارس في الموقع، ويُنظَّف المسبح صباح وصولك، وساحة الحيوانات لك ولأطفالك للمساعدة في إطعامها.',
    'Farms in the UAE': 'مزارع في الإمارات',
    'Beds across the club': 'الأسرّة في المزارع الثلاث',
    'Day guests, largest farm': 'ضيوف اليوم، أكبر مزرعة',
    'Tours on every farm': 'جولة 360° في كل مزرعة',
    'Largest · events': 'الأكبر · للمناسبات',
    'Twelve acres between the Kalba mangroves and the Hajar foothills. A long heated pool, a shaded kids\' pool, a majlis that seats sixty, horses and a camel at the far gate. Sleeps 18, hosts 60 for the day.': 'اثنا عشر فداناً بين أشجار القرم في كلباء وسفوح جبال الحجر. مسبح طويل مُدفأ، ومسبح أطفال مظلل، ومجلس يتسع لستين شخصاً، وخيول وجمل عند البوابة البعيدة. تنام 18 ضيفاً وتستقبل 60 لليوم.',
    'Explore Grand Haven': 'استكشف جراند هيفن',
    'Walk it in 360°': 'تجوّل بتقنية 360°',
    'Sleeps': 'تنام',
    '18 guests': '18 ضيفاً',
    '14 guests': '14 ضيفاً',
    '10 guests': '10 ضيوف',
    'Bedrooms': 'غرف النوم',
    'Pools': 'المسابح',
    '2, heated': '2، مُدفأة',
    '1, heated': '1، مُدفأ',
    'Plot': 'المساحة',
    '12 acres': '12 فداناً',
    '8 acres': '8 أفدنة',
    '5 acres': '5 أفدنة',
    'Pet friendly · families': 'ترحّب بالحيوانات · للعائلات',
    'The one built for children. Eight acres an hour from Dubai with a trampoline, a cycling track, a football pitch and the animal yard nobody leaves. Two heated pools, a covered barbecue deck, and your dog is welcome. Sleeps 14, hosts 40.': 'المزرعة المصمَّمة للأطفال. ثمانية أفدنة على ساعة من دبي، فيها ترامبولين ومسار للدراجات وملعب كرة قدم وساحة حيوانات لا يفارقها أحد. مسبحان مُدفأان، وشرفة شواء مغطاة، وكلبك مُرحَّب به. تنام 14 ضيفاً وتستقبل 40.',
    'Explore Happy Haven': 'استكشف هابي هيفن',
    'The quiet one': 'المزرعة الهادئة',
    'A mango and citrus orchard with a low white house at the centre, one heated pool under a pergola, and a barbecue terrace built for slow evenings. Five acres, no neighbours in earshot. Sleeps 10, hosts 30.': 'بستان مانجو وحمضيات يتوسطه بيت أبيض منخفض، ومسبح واحد مُدفأ تحت مظلة خشبية، وشرفة شواء للأمسيات الهادئة. خمسة أفدنة ولا جار على مسمع. تنام 10 ضيوف وتستقبل 30.',
    'Explore Green Haven': 'استكشف جرين هيفن',
    'How we run the farms': 'كيف ندير المزارع',
    'Three farms, one team. Not three separate hosts you hope reply.': 'ثلاث مزارع وفريق واحد. لا ثلاثة مُضيفين منفصلين تنتظر ردّهم.',
    'The whole property': 'المزرعة كاملة',
    'You get the gate code and the entire farm — the pool, the lawn, the majlis, the yard. No shared plots, no other group on the land.': 'تحصل على رمز البوابة والمزرعة بكاملها — المسبح والمرج والمجلس والساحة. لا أراضٍ مشتركة ولا مجموعة أخرى معك.',
    'Cleaned both ways': 'تنظيف قبل وبعد',
    'Every room is cleaned before you arrive and again after you leave. Fresh linen every booking, and the pool tested before each arrival.': 'تُنظَّف كل غرفة قبل وصولك ومرة أخرى بعد مغادرتك. مفارش نظيفة مع كل حجز، والمسبح يُفحص قبل كل وصول.',
    'Answered in minutes': 'ردّ في دقائق',
    'One WhatsApp thread, 8am to 11pm, usually answered inside fifteen minutes — by the people who actually run the farm.': 'محادثة واتساب واحدة، من 8 صباحاً إلى 11 مساءً، والرد عادة خلال خمس عشرة دقيقة — من الأشخاص الذين يديرون المزرعة فعلاً.',
    'Nothing hidden': 'لا شيء مخفي',
    'Drive times, road surface, gate access, pool heating months and house rules are all published on each farm page before you book.': 'أوقات الطريق وحالته والوصول إلى البوابة وأشهر تدفئة المسبح وقواعد المنزل — كلها منشورة في صفحة كل مزرعة قبل أن تحجز.',
    'Anything not here, open': 'ما لا تجده هنا، افتح',
    'Select any questions': 'اختر أي سؤال',
    'in the corner — there is a longer list in there, and it points you to the farm manager when a question needs a person.': 'في الزاوية — ستجد قائمة أطول، وتحوّلك إلى مدير المزرعة عندما يحتاج السؤال إلى شخص.',
    'How do I book a farm?': 'كيف أحجز مزرعة؟',
    'Call or WhatsApp the farm manager with the farm, the dates and the number of guests. We hold the farm for 24 hours while you confirm, then a refundable security deposit locks it in. A self-serve availability calendar is coming to this site soon.': 'اتصل أو راسل مدير المزرعة على واتساب مع اسم المزرعة والتواريخ وعدد الضيوف. نحجز لك المزرعة 24 ساعة حتى التأكيد، ثم يثبّتها مبلغ تأمين قابل للاسترداد. وسيضاف إلى الموقع قريباً تقويم توفّر ذاتي.',
    'Why are prices not on the site?': 'لماذا الأسعار غير مذكورة في الموقع؟',
    'Rates move with the farm, the season and whether it is a day booking or an overnight stay. Everything else you need is on these pages — so when you call, the only thing left to discuss is the number.': 'تتغير الأسعار حسب المزرعة والموسم وما إذا كان الحجز ليوم أو لليلة. كل ما تحتاجه غير ذلك موجود في هذه الصفحات — فحين تتصل، لا يبقى سوى الرقم.',
    'What are the check-in and check-out times?': 'ما أوقات الدخول والخروج؟',
    'Overnight stays run 3pm to 12pm. Day bookings run 10am to 10pm. Early check-in is often possible when the farm is free the night before.': 'الإقامة الليلية من 3 عصراً إلى 12 ظهراً. حجوزات اليوم من 10 صباحاً إلى 10 مساءً. والدخول المبكر ممكن غالباً إذا كانت المزرعة خالية في الليلة السابقة.',
    'Is the whole farm ours?': 'هل المزرعة كلها لنا؟',
    'Yes — the house, the pools, the lawns, the barbecue yard and the animal area are yours for the booking. Only the caretaker stays on site, and only in the service quarters.': 'نعم — البيت والمسابح والمروج وساحة الشواء ومنطقة الحيوانات كلها لك مدة الحجز. يبقى الحارس وحده في الموقع، وفي مسكن الخدمة فقط.',
    'Can we bring pets?': 'هل يمكننا إحضار حيواناتنا؟',
    'At Happy Haven, yes, on request — it is the pet-friendly farm. The other two keep livestock loose in parts of the plot, so guests\' animals stay home.': 'في هابي هيفن نعم، بناءً على الطلب — فهي المزرعة التي ترحّب بالحيوانات. أما الأخريان فتُترك فيهما المواشي سائبة في أجزاء من الأرض، لذا تبقى حيوانات الضيوف في البيت.',
    'Can we host an event?': 'هل يمكننا إقامة مناسبة؟',
    'Birthdays, family gatherings, corporate days and shoots are welcome. Amplified music must be down by 10pm, and weddings need written approval first.': 'أعياد الميلاد واللقاءات العائلية والأيام المؤسسية والتصوير كلها مُرحَّب بها. يجب إيقاف الموسيقى المُكبَّرة بحلول 10 مساءً، وتحتاج الأعراس إلى موافقة كتابية مسبقة.',
    'What are the house rules?': 'ما قواعد المنزل؟',
    'No smoking indoors, no fireworks, no alcohol on the farms, no unregistered overnight guests, and music down by 10pm out of respect for neighbouring farms.': 'لا تدخين داخل المنزل، ولا ألعاب نارية، ولا كحول في المزارع، ولا ضيوف مبيت غير مسجّلين، والموسيقى تُخفَض بحلول 10 مساءً احتراماً للمزارع المجاورة.',
    'Contact & map': 'التواصل والموقع',
    'Ask about a farm': 'اسأل عن مزرعة',

    /* — farm page shells — */
    'Farm No. 01 · Kalba, Sharjah': 'المزرعة رقم 01 · كلباء، الشارقة',
    'Farm No. 02 · Ras Al Khaimah': 'المزرعة رقم 02 · رأس الخيمة',
    'Farm No. 03 · Ras Al Khaimah': 'المزرعة رقم 03 · رأس الخيمة',
    'Grand Haven, Kalba — Sharjah': 'جراند هيفن، كلباء — الشارقة',
    'Happy Haven — Ras Al Khaimah': 'هابي هيفن — رأس الخيمة',
    'Green Haven — Ras Al Khaimah': 'جرين هيفن — رأس الخيمة',
    'Twelve acres between the Kalba mangroves and the Hajar foothills. You get the gate code, the whole farm, and a caretaker who stays out of the way.': 'اثنا عشر فداناً بين أشجار القرم في كلباء وسفوح جبال الحجر. تحصل على رمز البوابة، والمزرعة كاملة، وحارس لا يقترب إلا عند الحاجة.',
    'Eight acres an hour from Dubai, built around the children — and the one farm where your dog is welcome too.': 'ثمانية أفدنة على ساعة من دبي، مصمَّمة حول الأطفال — والمزرعة الوحيدة التي يُرحَّب فيها بكلبك أيضاً.',
    'A mango and citrus orchard with a low white house at the centre. The quiet farm — five acres, no neighbours in earshot.': 'بستان مانجو وحمضيات يتوسطه بيت أبيض منخفض. المزرعة الهادئة — خمسة أفدنة ولا جار على مسمع.',
    'Walk the farm in 360°': 'تجوّل في المزرعة بتقنية 360°',
    'Pick a spot, then drag the image to look around — scroll to zoom.': 'اختر موقعاً، ثم اسحب الصورة لتنظر حولك — وحرّك عجلة الفأرة للتقريب.',
    'Entrance': 'المدخل',
    'Swimming pool': 'المسبح',
    'Play area': 'منطقة اللعب',
    'Barbecue area': 'منطقة الشواء',
    'Farm animal area': 'ساحة الحيوانات',

    /* — about + cards — */
    'Grand Haven is the largest farm in the club — twelve acres of date palms and lawn on the Kalba side of the mountains, where the air comes off the Gulf of Oman. The house is low and thick-walled: eight bedrooms, a majlis that seats sixty, and doors that open straight onto grass.': 'جراند هيفن هي أكبر مزارعنا — اثنا عشر فداناً من النخيل والمروج على جانب كلباء من الجبال، حيث يأتي الهواء من خليج عُمان. البيت منخفض وجدرانه سميكة: ثماني غرف نوم، ومجلس يتسع لستين، وأبواب تُفتح على العشب مباشرة.',
    'Behind the palms is the working half of the farm: the goat and sheep yard, a chicken run, two horses and a camel with a handler who takes children out at sunset. Feeding is at 7am and 5pm, and it is the part every guest remembers.': 'خلف النخيل يقع النصف العامل من المزرعة: ساحة الماعز والأغنام، وعشّة الدجاج، وفرسان وجمل مع مرافق يخرج بالأطفال عند الغروب. الإطعام في 7 صباحاً و5 مساءً، وهو الجزء الذي يتذكره كل ضيف.',
    'Evenings happen at the barbecue yard — two charcoal grills under a covered deck, long tables, and string lights that go on at seven. Music down by ten; the neighbours are farms too.': 'الأمسيات في ساحة الشواء — مشويان بالفحم تحت سطح مغطى، وطاولات طويلة، وأضواء معلّقة تُشعل في السابعة. الموسيقى تُخفَض في العاشرة؛ فالجيران مزارع أيضاً.',
    'Happy Haven is the farm families come back to. Eight flat acres of lawn and shade trees in the Ras Al Khaimah countryside, an hour from Dubai, with a six-bedroom house that opens onto the grass on three sides.': 'هابي هيفن هي المزرعة التي تعود إليها العائلات. ثمانية أفدنة مستوية من المروج وأشجار الظل في ريف رأس الخيمة، على ساعة من دبي، وبيت بست غرف نوم يُفتح على العشب من ثلاث جهات.',
    'Everything here is built for children: a trampoline, a cycling track that loops the plot, a grass football pitch, swings and a sand pit, and a shallow shaded pool beside the heated main one. The animal yard — goats, sheep, chickens, rabbits — is open all day and feeding is at 7am and 5pm.': 'كل شيء هنا مصمَّم للأطفال: ترامبولين، ومسار دراجات يلفّ الأرض، وملعب كرة قدم عشبي، ومراجيح وحفرة رمل، ومسبح ضحل مظلل بجانب المسبح الرئيسي المُدفأ. وساحة الحيوانات — ماعز وأغنام ودجاج وأرانب — مفتوحة طول النهار والإطعام في 7 صباحاً و5 مساءً.',
    'It is also the only farm in the club that takes guests\' pets, on request. Evenings run long on the covered barbecue deck; music down by ten.': 'وهي أيضاً المزرعة الوحيدة التي تستقبل حيوانات الضيوف، بناءً على الطلب. الأمسيات تطول على شرفة الشواء المغطاة؛ والموسيقى تُخفَض في العاشرة.',
    'Green Haven is five acres of mango, lime and citrus in the Ras Al Khaimah interior, with a low white house at the centre and a pergola-shaded pool that stays cool through the afternoon. Four bedrooms, a majlis for thirty, and quiet in every direction.': 'جرين هيفن خمسة أفدنة من المانجو والليمون والحمضيات في داخلية رأس الخيمة، يتوسطها بيت أبيض منخفض ومسبح مظلل بمظلة خشبية يبقى بارداً طول العصر. أربع غرف نوم، ومجلس لثلاثين، وهدوء في كل اتجاه.',
    'The orchard is worked, not decorative — the caretaker will walk you through the rows and let the children pick whatever is in season. Behind it sits the animal yard: goats, sheep, chickens and rabbits, fed at 7am and 5pm.': 'البستان عامل لا للزينة — سيمشي بك الحارس بين الصفوف ويترك الأطفال يقطفون ما هو في موسمه. وخلفه تقع ساحة الحيوانات: ماعز وأغنام ودجاج وأرانب، تُطعَم في 7 صباحاً و5 مساءً.',
    'The barbecue terrace was built for slow evenings — one long table, two grills, and the kind of dark sky you only get this far from the coast road.': 'بُنيت شرفة الشواء للأمسيات الهادئة — طاولة طويلة واحدة، ومشويان، وسماء مظلمة لا تجدها إلا بعيداً هكذا عن طريق الساحل.',
    'The house': 'البيت',
    'Outdoors': 'في الخارج',
    'The farm': 'المزرعة',
    'Good to know': 'من المفيد معرفته',
    '8 air-conditioned bedrooms, 18 beds': '8 غرف نوم مكيفة، 18 سريراً',
    '6 air-conditioned bedrooms, 14 beds': '6 غرف نوم مكيفة، 14 سريراً',
    '4 air-conditioned bedrooms, 10 beds': '4 غرف نوم مكيفة، 10 أسرّة',
    'Majlis seating 60': 'مجلس يتسع لـ 60',
    'Majlis seating 40': 'مجلس يتسع لـ 40',
    'Majlis seating 30': 'مجلس يتسع لـ 30',
    'Full kitchen and service pantry': 'مطبخ كامل ومخزن خدمة',
    'Wi-Fi, sound system, smart TV': 'واي فاي، نظام صوتي، تلفاز ذكي',
    'Heated 20m pool + shaded kids\' pool': 'مسبح مُدفأ 20 م + مسبح أطفال مظلل',
    'Heated pool + shaded kids\' pool': 'مسبح مُدفأ + مسبح أطفال مظلل',
    'Heated pool under a pergola': 'مسبح مُدفأ تحت مظلة خشبية',
    'Covered barbecue yard, 2 grills': 'ساحة شواء مغطاة، مشويان',
    'Covered barbecue deck, 2 grills': 'شرفة شواء مغطاة، مشويان',
    'Barbecue terrace, 2 grills': 'شرفة شواء، مشويان',
    'Play area: swings, frame, sand pit': 'منطقة لعب: مراجيح، مجسم تسلّق، حفرة رمل',
    'Play area: swings and sand pit': 'منطقة لعب: مراجيح وحفرة رمل',
    'Trampoline, swings, sand pit': 'ترامبولين، مراجيح، حفرة رمل',
    'Grass football pitch': 'ملعب كرة قدم عشبي',
    'Football pitch and cycling track': 'ملعب كرة قدم ومسار دراجات',
    'Grass lawn and hammocks': 'مرج عشبي وأراجيح شبكية',
    'Vegetable rows you can pick': 'صفوف خضار يمكنك القطف منها',
    'Mango, lime and citrus rows': 'صفوف مانجو وليمون وحمضيات',
    'Goats, sheep, chickens, rabbits': 'ماعز، أغنام، دجاج، أرانب',
    'Two horses and a camel, with handler': 'فرسان وجمل، مع مرافق',
    'Feeding at 7am and 5pm': 'الإطعام في 7 صباحاً و5 مساءً',
    '12 acres of palms and lawn': '12 فداناً من النخيل والمروج',
    '8 acres of lawn and shade trees': '8 أفدنة من المروج وأشجار الظل',
    '5 acres of worked orchard': '5 أفدنة من بستان عامل',
    'Sleeps 18 · 60 day guests': 'تنام 18 · 60 ضيف يوم',
    'Sleeps 14 · 40 day guests': 'تنام 14 · 40 ضيف يوم',
    'Sleeps 10 · 30 day guests': 'تنام 10 · 30 ضيف يوم',
    'Check in 3pm, out 12pm': 'الدخول 3 عصراً، الخروج 12 ظهراً',
    'Parking for 20 cars, gated': 'مواقف لـ 20 سيارة، ببوابة',
    'Parking for 14 cars, gated': 'مواقف لـ 14 سيارة، ببوابة',
    'Parking for 10 cars, gated': 'مواقف لـ 10 سيارات، ببوابة',
    'No pets, no smoking indoors': 'لا حيوانات، ولا تدخين داخل المنزل',
    'Pets welcome on request': 'الحيوانات مُرحَّب بها بناءً على الطلب',

    /* — before you come — */
    'The practical half of the farm — how you get here, what we do between stays, and which months are the good ones. Everything below is published before you book, not after.': 'النصف العملي من المزرعة — كيف تصل، وما نفعله بين إقامة وأخرى، وأي الأشهر هي الأفضل. كل ما تحته منشور قبل الحجز، لا بعده.',
    'Getting here': 'كيف تصل',
    'Drive times are off-peak, from city centre to gate.': 'أوقات الطريق في غير ساعات الذروة، من وسط المدينة إلى البوابة.',
    '1 h 45 min via E611 and the Sharjah–Kalba road': 'ساعة و45 دقيقة عبر E611 وطريق الشارقة – كلباء',
    '1 h via E311 and the Emirates Road': 'ساعة عبر E311 وشارع الإمارات',
    '1 h 10 min via E311': 'ساعة و10 دقائق عبر E311',
    '1 h 20 min': 'ساعة و20 دقيقة',
    '2 h 10 min': 'ساعتان و10 دقائق',
    '2 h 15 min': 'ساعتان و15 دقيقة',
    '2 h 20 min': 'ساعتان و20 دقيقة',
    '45 min': '45 دقيقة',
    '50 min': '50 دقيقة',
    '25 min': '25 دقيقة',
    '20 min': '20 دقيقة',
    '10 min': '10 دقائق',
    '8 min': '8 دقائق',
    'The last stretch.': 'آخر مسافة.',
    'Tarmac to the gate. No 4×4 needed — the last 600 m is a graded farm track, flat and fine for a saloon car. Gated parking for 20 cars inside the wall.': 'إسفلت حتى البوابة. لا حاجة لسيارة دفع رباعي — آخر 600 متر مسار زراعي ممهّد ومستوٍ وملائم لسيارة عادية. مواقف ببوابة لـ 20 سيارة داخل السور.',
    'Tarmac the whole way to the gate. Any car is fine. Gated parking for 14 cars, with space to turn a minibus.': 'إسفلت طول الطريق حتى البوابة. أي سيارة تكفي. مواقف ببوابة لـ 14 سيارة، مع مساحة لدوران حافلة صغيرة.',
    'Tarmac to the gate, then a short gravel drive through the orchard. Any car is fine. Gated parking for 10 cars under the trees.': 'إسفلت حتى البوابة، ثم ممر حصوي قصير عبر البستان. أي سيارة تكفي. مواقف ببوابة لـ 10 سيارات تحت الأشجار.',
    'Arrival.': 'الوصول.',
    'We send the pin, the gate code and the caretaker’s number on WhatsApp the morning of your stay, and again an hour before check-in. Nobody waits at a locked gate.': 'نرسل الموقع ورمز البوابة ورقم الحارس على واتساب صباح إقامتك، ومرة أخرى قبل ساعة من الدخول. لا أحد ينتظر أمام بوابة مغلقة.',
    'Phone and Wi-Fi.': 'الهاتف والواي فاي.',
    'Etisalat and du both full strength across the plot. Wi-Fi reaches the majlis, the bedrooms and about half the lawn.': 'إشارة اتصالات ودو كاملة في كل الأرض. والواي فاي يصل المجلس وغرف النوم ونحو نصف المرج.',
    'Full coverage on both networks. Wi-Fi reaches the house, the majlis and the play lawn.': 'تغطية كاملة على الشبكتين. والواي فاي يصل البيت والمجلس ومرج اللعب.',
    'Full coverage on both networks. Wi-Fi is strong in the house and patchy at the far end of the orchard — which some guests count as a feature.': 'تغطية كاملة على الشبكتين. الواي فاي قوي في البيت ومتقطّع في آخر البستان — وبعض الضيوف يعدّون ذلك ميزة.',
    'Supermarket': 'سوبرماركت',
    'Pharmacy': 'صيدلية',
    'Hospital': 'مستشفى',
    'Fuel': 'وقود',
    'Restaurants': 'مطاعم',
    'Petrol': 'محطة وقود',
    'ATM': 'صرّاف آلي',
    'Kalba town, 12 min': 'مدينة كلباء، 12 دقيقة',
    'Kalba Hospital, 15 min': 'مستشفى كلباء، 15 دقيقة',
    'ADNOC, 9 min': 'أدنوك، 9 دقائق',
    'ADNOC, 7 min': 'أدنوك، 7 دقائق',
    'ENOC, 6 min': 'إينوك، 6 دقائق',
    'RAK, 25 min': 'رأس الخيمة، 25 دقيقة',
    'RAK, 20 min': 'رأس الخيمة، 20 دقيقة',
    'Between every stay': 'بين كل إقامة وأخرى',
    'Every room is cleaned before you arrive and again after you leave — not turned over between two groups on the same day. The farm is managed by one team across all three properties, so the standard does not depend on which caretaker is on.': 'تُنظَّف كل غرفة قبل وصولك ومرة أخرى بعد مغادرتك — ولا تُهيَّأ بين مجموعتين في اليوم نفسه. ويدير المزارع الثلاث فريق واحد، فلا يعتمد المستوى على الحارس المناوب.',
    'Bedrooms and bathrooms cleaned before check-in and after check-out': 'غرف النوم والحمامات تُنظَّف قبل الدخول وبعد الخروج',
    'Fresh linen and towels for every booking': 'مفارش ومناشف نظيفة مع كل حجز',
    'Pool tested and treated before each arrival': 'المسبح يُفحَص ويُعالَج قبل كل وصول',
    'Kitchen, majlis and barbecue yard cleared down between stays': 'المطبخ والمجلس وساحة الشواء تُنظَّف بين الإقامات',
    'Caretaker on the plot, reachable and out of the way': 'حارس في الموقع، يمكن الوصول إليه ولا يزعجك',
    'Season by season': 'موسماً بموسم',
    'Comfortable months': 'الأشهر المريحة',
    'October to April — the Kalba side stays two or three degrees cooler than inland': 'من أكتوبر إلى أبريل — وجانب كلباء أبرد بدرجتين أو ثلاث من الداخل',
    'October to April, with March and April the best for the play areas': 'من أكتوبر إلى أبريل، ومارس وأبريل الأفضل لمناطق اللعب',
    'October to April; the orchard holds its shade longer than an open plot': 'من أكتوبر إلى أبريل؛ والبستان يحفظ ظلّه أطول من أرض مكشوفة',
    'Pool heating': 'تدفئة المسبح',
    'On from November to March, no extra charge — tell us when you book': 'تعمل من نوفمبر إلى مارس دون رسوم إضافية — أخبرنا عند الحجز',
    'Midday': 'وقت الظهيرة',
    'June to September the lawn is for early morning and after five; the majlis is air-conditioned all day': 'من يونيو إلى سبتمبر المرج للصباح الباكر وبعد الخامسة؛ والمجلس مكيَّف طول النهار',
    'In summer the trampoline and cycling track are morning and evening; the kids’ pool is shaded all day': 'في الصيف يكون الترامبولين ومسار الدراجات صباحاً ومساءً؛ ومسبح الأطفال مظلل طول النهار',
    'Sunset': 'الغروب',
    'Around 5:40pm in winter, 7pm in summer — the camel walk goes out just before': 'نحو 5:40 مساءً شتاءً و7 مساءً صيفاً — وتخرج مسيرة الجمل قبلها بقليل',
    'Animals': 'الحيوانات',
    'Feeding at 7am and 5pm year round — children can join both': 'الإطعام في 7 صباحاً و5 مساءً طول السنة — ويمكن للأطفال المشاركة في الاثنين',
    'Mangoes': 'المانجو',
    'Ripe May to August — pick what you can eat': 'ينضج من مايو إلى أغسطس — اقطف ما تستطيع أكله',
    'Citrus': 'الحمضيات',
    'Limes and oranges through the winter months': 'الليمون والبرتقال طوال أشهر الشتاء',
    'Ask us anything': 'اسألنا عن أي شيء',
    'Questions about Grand Haven go straight to the person who runs it. We answer on WhatsApp between 8am and 11pm, usually within fifteen minutes.': 'أسئلتك عن جراند هيفن تصل مباشرة إلى من يديرها. نجيب على واتساب بين 8 صباحاً و11 مساءً، عادة خلال خمس عشرة دقيقة.',
    'Questions about Happy Haven go straight to the person who runs it. We answer on WhatsApp between 8am and 11pm, usually within fifteen minutes.': 'أسئلتك عن هابي هيفن تصل مباشرة إلى من يديرها. نجيب على واتساب بين 8 صباحاً و11 مساءً، عادة خلال خمس عشرة دقيقة.',
    'Questions about Green Haven go straight to the person who runs it. We answer on WhatsApp between 8am and 11pm, usually within fifteen minutes.': 'أسئلتك عن جرين هيفن تصل مباشرة إلى من يديرها. نجيب على واتساب بين 8 صباحاً و11 مساءً، عادة خلال خمس عشرة دقيقة.',

    /* — per-farm FAQs — */
    'Grand Haven FAQs': 'أسئلة جراند هيفن الشائعة',
    'Happy Haven FAQs': 'أسئلة هابي هيفن الشائعة',
    'Green Haven FAQs': 'أسئلة جرين هيفن الشائعة',
    'Guests, rooms, pets and pools — the answers that differ farm to farm. General booking and payment questions live on the': 'الضيوف والغرف والحيوانات والمسابح — الأجوبة التي تختلف من مزرعة لأخرى. أما أسئلة الحجز والدفع العامة فتجدها في',
    'club FAQs': 'الأسئلة الشائعة العامة',
    'How many people can stay at Grand Haven?': 'كم شخصاً يمكن أن يقيم في جراند هيفن؟',
    'How many people can stay at Happy Haven?': 'كم شخصاً يمكن أن يقيم في هابي هيفن؟',
    'How many people can stay at Green Haven?': 'كم شخصاً يمكن أن يقيم في جرين هيفن؟',
    'Eight air-conditioned bedrooms with 18 beds, so 18 guests overnight. For day bookings the farm takes 60 — the majlis seats 60 and the lawn holds more.': 'ثماني غرف نوم مكيفة فيها 18 سريراً، أي 18 ضيفاً للمبيت. ولحجوزات اليوم تستقبل المزرعة 60 — فالمجلس يتسع لستين والمرج يحمل أكثر.',
    'Six air-conditioned bedrooms with 14 beds, so 14 guests overnight, and up to 40 for a day booking.': 'ست غرف نوم مكيفة فيها 14 سريراً، أي 14 ضيفاً للمبيت، وحتى 40 لحجز اليوم.',
    'Four air-conditioned bedrooms with 10 beds, so 10 guests overnight, and up to 30 for a day booking. It is the smallest and quietest farm in the club.': 'أربع غرف نوم مكيفة فيها 10 أسرّة، أي 10 ضيوف للمبيت، وحتى 30 لحجز اليوم. وهي أصغر المزارع وأهدأها.',
    'How many bedrooms and bathrooms are there?': 'كم عدد غرف النوم والحمامات؟',
    'Eight bedrooms, each with its own bathroom, plus two guest bathrooms off the majlis and a changing room by the pool.': 'ثماني غرف نوم، لكل واحدة حمامها، إضافة إلى حمامَي ضيوف عند المجلس وغرفة تغيير قرب المسبح.',
    'Six bedrooms — two of them family rooms with bunks — four bathrooms, and an outdoor shower by the pool.': 'ست غرف نوم — اثنتان منها غرف عائلية بأسرّة طابقية — وأربعة حمامات، ودُش خارجي قرب المسبح.',
    'Four bedrooms, three bathrooms, and a pergola shower next to the pool.': 'أربع غرف نوم، وثلاثة حمامات، ودُش تحت مظلة خشبية بجانب المسبح.',
    'Can we bring our own pets?': 'هل يمكننا إحضار حيواناتنا الخاصة؟',
    'No. Grand Haven keeps goats, sheep, horses and a camel loose in parts of the plot, so guests’ animals have to stay home. Happy Haven is the pet-friendly farm in the club.': 'لا. تُترك في جراند هيفن ماعز وأغنام وخيول وجمل سائبة في أجزاء من الأرض، لذا تبقى حيوانات الضيوف في البيت. وهابي هيفن هي المزرعة التي ترحّب بالحيوانات.',
    'Yes. Happy Haven is the pet-friendly farm in the club — tell us on booking so the caretaker keeps the livestock penned while your dog settles in. Well-behaved dogs only, and not in the bedrooms.': 'نعم. هابي هيفن هي المزرعة التي ترحّب بالحيوانات — أخبرنا عند الحجز ليُبقي الحارس المواشي في حظائرها حتى يعتاد كلبك المكان. الكلاب المؤدَّبة فقط، ولا تدخل غرف النوم.',
    'No — the orchard has loose livestock and fruit rows we would rather not lose. Happy Haven is the pet-friendly farm.': 'لا — في البستان مواشٍ سائبة وصفوف فاكهة نفضّل ألا نخسرها. وهابي هيفن هي المزرعة التي ترحّب بالحيوانات.',
    'What animals are on the farm?': 'ما الحيوانات الموجودة في المزرعة؟',
    'Goats, sheep, chickens and rabbits in the yard, two horses, and a camel with a handler who takes children out at sunset. Feeding is at 7am and 5pm and guests are welcome to join.': 'ماعز وأغنام ودجاج وأرانب في الساحة، وفرسان، وجمل مع مرافق يخرج بالأطفال عند الغروب. الإطعام في 7 صباحاً و5 مساءً والضيوف مُرحَّب بمشاركتهم.',
    'What animals can the children meet?': 'ما الحيوانات التي يمكن للأطفال مقابلتها؟',
    'Goats, sheep, chickens and rabbits, all hand-reared and used to children. Feeding is at 7am and 5pm, and the vegetable rows are yours to pick from.': 'ماعز وأغنام ودجاج وأرانب، كلها مُربّاة باليد ومعتادة على الأطفال. الإطعام في 7 صباحاً و5 مساءً، وصفوف الخضار لك للقطف منها.',
    'Is there a pool, and is it heated?': 'هل هناك مسبح، وهل هو مُدفأ؟',
    'A heated 20m pool and a separate shaded kids’ pool. Heating runs November to March at no extra cost; say so when you book and it is on before you arrive.': 'مسبح مُدفأ بطول 20 متراً ومسبح أطفال مظلل منفصل. التدفئة تعمل من نوفمبر إلى مارس دون رسوم إضافية؛ اذكر ذلك عند الحجز لتكون جاهزة قبل وصولك.',
    'A heated main pool and a shallow shaded pool for toddlers. Heating runs November to March at no extra cost.': 'مسبح رئيسي مُدفأ ومسبح ضحل مظلل للصغار. التدفئة تعمل من نوفمبر إلى مارس دون رسوم إضافية.',
    'One heated pool under a pergola, shaded most of the day. Heating runs November to March at no extra cost.': 'مسبح واحد مُدفأ تحت مظلة خشبية، مظلل معظم النهار. التدفئة تعمل من نوفمبر إلى مارس دون رسوم إضافية.',
    'What are check-in and check-out times?': 'ما أوقات الدخول والخروج؟',
    'Overnight 3pm to 12pm; day bookings 10am to 10pm. Early check-in is usually fine when the farm is free the night before.': 'المبيت من 3 عصراً إلى 12 ظهراً؛ وحجوزات اليوم من 10 صباحاً إلى 10 مساءً. والدخول المبكر ممكن عادة إذا كانت المزرعة خالية في الليلة السابقة.',
    'Overnight 3pm to 12pm; day bookings 10am to 10pm.': 'المبيت من 3 عصراً إلى 12 ظهراً؛ وحجوزات اليوم من 10 صباحاً إلى 10 مساءً.',
    'How much parking is there, and how far is Dubai?': 'كم مواقف السيارات، وكم تبعد دبي؟',
    'Gated parking for 20 cars. It is about 1h45 from Dubai and 45 minutes from Fujairah.': 'مواقف ببوابة لـ 20 سيارة. وتبعد نحو ساعة و45 دقيقة عن دبي و45 دقيقة عن الفجيرة.',
    'How far is it from Dubai, and where do we park?': 'كم تبعد عن دبي، وأين نوقف السيارات؟',
    'About an hour from Dubai, in Ras Al Khaimah. Gated parking for 14 cars.': 'نحو ساعة من دبي، في رأس الخيمة. مواقف ببوابة لـ 14 سيارة.',
    'Can we host a wedding or a large event here?': 'هل يمكننا إقامة عرس أو مناسبة كبيرة هنا؟',
    'Grand Haven is the farm built for it — 60 seated in the majlis, a covered barbecue yard and two grills. Birthdays, corporate days and shoots need no approval; weddings and amplified stages need written approval, and music is down by 10pm.': 'جراند هيفن هي المزرعة المهيّأة لذلك — 60 مقعداً في المجلس، وساحة شواء مغطاة ومشويان. أعياد الميلاد والأيام المؤسسية والتصوير لا تحتاج موافقة؛ أما الأعراس والمسارح المُكبَّرة فتحتاج موافقة كتابية، والموسيقى تُخفَض بحلول 10 مساءً.',
    'Can we pick the fruit?': 'هل يمكننا قطف الفاكهة؟',
    'Yes, in season — mangoes from May to August, limes and citrus through the winter. Take what you can eat; the rest goes to the market.': 'نعم، في موسمها — المانجو من مايو إلى أغسطس، والليمون والحمضيات طوال الشتاء. خذ ما تستطيع أكله؛ والباقي يذهب إلى السوق.',
    'Is this the right farm for small children?': 'هل هذه المزرعة مناسبة للأطفال الصغار؟',
    'It is the one built around them: trampoline, swings, sand pit, a cycling track, a shaded kids’ pool and a fenced play lawn you can see from the majlis.': 'هي المزرعة المصمَّمة حولهم: ترامبولين ومراجيح وحفرة رمل ومسار دراجات ومسبح أطفال مظلل ومرج لعب مسوَّر تراه من المجلس.',
    'Is Green Haven suitable for children?': 'هل جرين هيفن مناسبة للأطفال؟',
    'Yes, though it is the calm farm rather than the playground one: swings, a sand pit, a lawn and hammocks. Families wanting a trampoline and a cycling track should look at Happy Haven.': 'نعم، لكنها المزرعة الهادئة لا مزرعة الملاعب: مراجيح وحفرة رمل ومرج وأراجيح شبكية. والعائلات التي تريد ترامبولين ومسار دراجات فليتجهوا إلى هابي هيفن.',
    'Can we host an event, and is there parking?': 'هل يمكننا إقامة مناسبة، وهل توجد مواقف؟',
    'Small gatherings up to 30 — birthdays, retreats, shoots. Gated parking for 10 cars, and amplified music is down by 10pm.': 'لقاءات صغيرة حتى 30 شخصاً — أعياد ميلاد وخلوات وتصوير. مواقف ببوابة لـ 10 سيارات، والموسيقى المُكبَّرة تُخفَض بحلول 10 مساءً.',

    /* — farm page contact — */
    'Getting here & contact': 'الوصول والتواصل',
    'Grand Haven, Kalba': 'جراند هيفن، كلباء',
    '1h45 from Dubai · 45 min from Fujairah': 'ساعة و45 دقيقة من دبي · 45 دقيقة من الفجيرة',
    '1h from Dubai · 25 min from RAK city': 'ساعة من دبي · 25 دقيقة من مدينة رأس الخيمة',
    '1h10 from Dubai · 40 min from RAK city': 'ساعة و10 دقائق من دبي · 40 دقيقة من مدينة رأس الخيمة',
    'Ask about Grand Haven': 'اسأل عن جراند هيفن',
    'Ask about Happy Haven': 'اسأل عن هابي هيفن',
    'Ask about Green Haven': 'اسأل عن جرين هيفن',

    /* — the question helper — */
    'Things to know — nearby places, arrival, rules and the rest': 'معلومات تهمّك — الأماكن القريبة والوصول والقواعد وغيرها',
    'Things to know — open the question list': 'معلومات تهمّك — افتح قائمة الأسئلة',
    'Close': 'إغلاق',
    'All questions': 'كل الأسئلة',
    'WhatsApp us': 'راسلنا على واتساب',
    'WhatsApp': 'واتساب',
    'Related': 'أسئلة ذات صلة',
    'The farms': 'المزارع',
    'Staying there': 'الإقامة',
    'Pools, play & animals': 'المسابح واللعب والحيوانات',
    'Events & rules': 'المناسبات والقواعد',
    'Things to know': 'معلومات تهمّك',
    'Price & booking': 'السعر والحجز',
    'Call the farm manager': 'اتصل بمدير المزرعة',
    'Here is what sits closest to the gate, by car:': 'هذه أقرب الأماكن إلى البوابة، بالسيارة:',
    'What is nearby — shops, pharmacy, hospital?': 'ما القريب من المزرعة — متاجر، صيدلية، مستشفى؟',
    'We are still writing these down for this farm — ask the farm manager and you will get the exact spots and drive times.': 'ما زلنا نجمع هذه التفاصيل لهذه المزرعة — اسأل مدير المزرعة لتحصل على الأماكن وأوقات الطريق بدقة.',
    'What is Farmsclub?': 'ما هو فارمزكلب؟',
    'Where are the three farms?': 'أين تقع المزارع الثلاث؟',
    'Which farm should I pick?': 'أي مزرعة أختار؟',
    'Do we get the whole farm to ourselves?': 'هل تكون المزرعة كلها لنا؟',
    'How many guests can stay?': 'كم ضيفاً يمكن أن يقيم؟',
    'What are the bedrooms like?': 'كيف هي غرف النوم؟',
    'What is inside the house?': 'ما يوجد داخل البيت؟',
    'Tell me about the pools.': 'حدّثني عن المسابح.',
    'Is there a barbecue area?': 'هل هناك منطقة شواء؟',
    'What animals are on the farms?': 'ما الحيوانات في المزارع؟',
    'What is there for children?': 'ما المتاح للأطفال؟',
    'Can we bring our pets?': 'هل يمكننا إحضار حيواناتنا؟',
    'Is there staff on site?': 'هل يوجد طاقم في الموقع؟',
    'What should we bring?': 'ما الذي يجب أن نحضره؟',
    'How do we get there and where do we park?': 'كيف نصل وأين نوقف السيارات؟',
    'How do the 360° tours work?': 'كيف تعمل جولات 360°؟',
    'What does it cost?': 'كم التكلفة؟',
    'Is a date available?': 'هل التاريخ متاح؟',
    'How do I book?': 'كيف أحجز؟',
    'What if we need to cancel?': 'وإذا احتجنا الإلغاء؟',
    'I want to speak to someone.': 'أريد التحدث إلى شخص.'
  };

  /* Stamp every heading with its English source NOW — this file is deferred, so
     it runs after the HTML is parsed but before fc-motion's DOMContentLoaded
     pass splits headings into per-word spans, and before any translation. That
     attribute is the single source of truth for heading text in both languages. */
  const stampHeadings = () => {
    document.querySelectorAll('h1, h2, h3').forEach((h) => {
      if (h.hasAttribute('data-fc-en')) return;
      if (h.querySelector('.fc-word')) {
        /* already split — fall back to the string fc-motion stashed pre-split */
        const stashed = h.getAttribute('data-fc-text');
        if (stashed) h.setAttribute('data-fc-en', stashed);
        return;
      }
      const t = h.textContent.replace(/\s+/g, ' ').trim();
      if (t) h.setAttribute('data-fc-en', t);
    });
  };
  stampHeadings();

  const ATTRS = ['aria-label', 'title', 'placeholder', 'data-tip'];
  const originals = new WeakMap();   /* node -> original English */
  let lang = 'en';

  /* A heading may already be split into per-word spans by fc-motion. Its text
     nodes are single words, so the whole-heading key cannot match — translate
     from the stashed original instead and flatten to one node. */
  const swapHeadings = (root, to) => {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('[data-fc-en]').forEach((h) => {
      const key = h.getAttribute('data-fc-en');
      if (!key) return;
      if (to === 'ar') {
        if (!AR[key] || h.dataset.fcAr) return;
        h.dataset.fcAr = '1';
        h.textContent = AR[key];          /* flattens any per-word spans */
      } else if (h.dataset.fcAr) {
        delete h.dataset.fcAr;
        h.textContent = key;              /* always the English source */
      }
    });
  };

  const swap = (root, to) => {
    if (!root) return;
    swapHeadings(root, to);
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentNode && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentNode.nodeName))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    let n; while ((n = walk.nextNode())) nodes.push(n);
    nodes.forEach((node) => {
      if (to === 'ar') {
        const key = node.nodeValue.replace(/\s+/g, ' ').trim();
        if (!key || !AR[key] || originals.has(node)) return;
        originals.set(node, node.nodeValue);
        node.nodeValue = node.nodeValue.replace(key, AR[key]);
      } else if (originals.has(node)) {
        node.nodeValue = originals.get(node);
        originals.delete(node);
      }
    });
    const els = root.querySelectorAll ? root.querySelectorAll('*') : [];
    els.forEach((el) => ATTRS.forEach((at) => {
      const cur = el.getAttribute && el.getAttribute(at);
      if (!cur) return;
      const store = 'fcEn' + at.replace(/[^a-z]/gi, '');
      if (to === 'ar') {
        const key = cur.replace(/\s+/g, ' ').trim();
        if (AR[key] && !el.dataset[store]) { el.dataset[store] = cur; el.setAttribute(at, AR[key]); }
      } else if (el.dataset[store]) { el.setAttribute(at, el.dataset[store]); delete el.dataset[store]; }
    }));
  };

  const roots = () => {
    const r = [document.body];
    document.querySelectorAll('ask-agent, ai-agent').forEach((a) => { if (a.shadowRoot) r.push(a.shadowRoot); });
    return r;
  };

  const apply = (to) => {
    lang = to;
    const html = document.documentElement;
    html.setAttribute('lang', to === 'ar' ? 'ar' : 'en');
    html.setAttribute('dir', to === 'ar' ? 'rtl' : 'ltr');
    roots().forEach((r) => swap(r, to));
    document.querySelectorAll('[data-fc-lang-btn]').forEach((b) => {
      b.textContent = to === 'ar' ? 'English' : 'العربية';
      b.setAttribute('lang', to === 'ar' ? 'en' : 'ar');
      b.setAttribute('aria-label', to === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
      b.setAttribute('data-tip', to === 'ar' ? 'Read this page in English' : 'اقرأ هذه الصفحة بالعربية');
    });
    try { localStorage.setItem('fc-lang', to); } catch (e) {}
    dispatchEvent(new Event('fc-lang'));
  };

  /* the switch, dropped in next to the wordmark */
  const mount = () => {
    const nav = document.querySelector('nav.nav');
    const brand = nav && nav.querySelector('.nav-brand');
    if (!nav || !brand || nav.querySelector('[data-fc-lang-btn]')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'fc-lang';
    b.setAttribute('data-fc-lang-btn', '');
    b.textContent = 'العربية';
    b.setAttribute('lang', 'ar');
    b.setAttribute('aria-label', 'التبديل إلى العربية');
    b.setAttribute('data-tip', 'اقرأ هذه الصفحة بالعربية');
    b.addEventListener('click', () => apply(lang === 'ar' ? 'en' : 'ar'));
    brand.insertAdjacentElement('afterend', b);
  };

  const start = () => {
    mount();
    let saved = 'en';
    try { saved = localStorage.getItem('fc-lang') || 'en'; } catch (e) {}
    if (saved === 'ar') apply('ar'); else apply('en');
    /* the helper widget writes new bubbles as you use it — keep them translated */
    const obs = new MutationObserver((muts) => {
      if (lang !== 'ar') return;
      muts.forEach((m) => m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1 && node.nodeType !== 3) return;
        const el = node.nodeType === 3 ? node.parentNode : node;
        swap(el, 'ar');
        /* a heading being split as it scrolls in: catch the element itself too */
        if (el && el.closest) { const h = el.closest('[data-fc-text]'); if (h) swapHeadings(h.parentNode || document.body, 'ar'); }
      }));
    });
    roots().forEach((r) => obs.observe(r, { childList: true, subtree: true }));
    /* the widget may upgrade after us */
    setTimeout(() => { mount(); if (lang === 'ar') roots().forEach((r) => swap(r, 'ar')); roots().forEach((r) => obs.observe(r, { childList: true, subtree: true })); }, 400);
    /* fc-motion tags each heading with data-fc-text as it scrolls into view —
       translate those on sight rather than waiting for its reveal to finish */
    const sweep = () => { stampHeadings(); if (lang === 'ar') swapHeadings(document.body, 'ar'); };
    addEventListener('scroll', sweep, { passive: true });
    new MutationObserver(sweep).observe(document.documentElement, { attributes: true, attributeFilter: ['data-fc-text'], subtree: true });
    /* leaving Arabic: drop any stale per-word spans left from the RTL pass */
    addEventListener('fc-lang', () => { if (lang === 'en') swapHeadings(document.body, 'en'); });
  };

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', start); else start();
})();
