interface GuideHolidayConstantType {
  [key: string]: {
    'guide-holiday': string
    'guide-holiday-detail': string
  }
}

export const GUIDE_HOLIDAY_CONSTANT: GuideHolidayConstantType = {
  KOREAN: {
    'guide-holiday': '공휴일',
    'guide-holiday-detail':
      '1. 명절\n한국에는 명절과 계절에 따라 지키는 행사(세시풍습)들이 있다. 한국은 달력에서 양력과 음력 날짜를 함께 사용하고 있다. 명절과 계절행사는 주로 음력으로 지내고 있다.\n\n◉ 설날(음력 1월 1일)\n• 의미 : 음력 새해가 시작되는 날\n• 음식 : 떡국, 만두\n• 하는 일 : 새 옷(설빔)입기, 세배(어른에게 절함)와 성묘(조상 산소에 감), 윷놀이\n※ 설날 전날, 설날, 설날 다음날(음력 12월 말일, 1월 1일, 2일)은 공휴일이 됨\n\n◉ 추석(음력 8월 15일)\n• 의미 : 한해 농사에 감사하는 날\n• 음식 : 햇곡식(가을에 새로 나온 곡식)과 송편\n• 하는 일 : 차례 지내고 성묘하기, 달맞이, 강강술래 놀이\n※ 추석 전날, 추석, 추석 다음날(음력 8월 14일, 15일, 16일)은 공휴일이 됨\n\n2. 공휴일\n◉ 1월 1일 : 양력 새해가 시작되는 날\n◉ 삼일절(양력 3월 1일) : 일본 강제점령시대에 독립을 요구하며 1919년 3월 1일에 시작되어 전국적으로 확산된 대규모 독립운동을 기념하는 날\n◉ 석가탄신일(음력 4월 8일) : 석가모니가 탄생한 날\n◉ 어린이날(양력 5월 5일) : 어린이의 인격을 소중히 여기고, 어린이의 행복을 도모하기 위해 제정한 기념일\n◉ 현충일(양력 6월 6일) : 한국전쟁 전사자들을 비롯하여 국가를 위해 목숨을 바친 이들을 기리는 날\n\n◉ 광복절(양력 8월 15일) : 1945년 8월 15일, 일본의 강제점령에서 벗어나 독립한 날\n◉ 개천절(양력 10월 3일) : 한민족의 시조 단군이 개국한 날을 기념하는 날. 개천절은 하늘이 열린 날이라는 뜻\n◉ 한글날(양력 10월 9일) : 세종대왕의 한글 반포를 기념하고 한글의 연구 · 보급을 장려하기 위하여 정한 날\n\n◉ 성탄절(양력 12월 25일) : 예수 그리스도가 탄생한 날\n◉ 일요일\n◉ 임시공휴일 : 공직자 선거, 공휴일과 명절이 겹치는 경우 등의 이유로 정부에서 임시로 정하는 날',
  },

  ENGLISH: {
    'guide-holiday': 'Holiday',
    'guide-holiday-detail':
      "1. Holidays\nIn Korea, there are events (seasonal customs) that are observed according to holidays and seasons. Korea uses both the solar and lunar calendar dates. Holidays and seasonal events are mainly celebrated according to the lunar calendar.\n\n◉ Seollal (Lunar New Year's Day, January 1st)\n• Meaning: The first day of the lunar New Year\n• Food: Tteokguk (rice cake soup), Mandu (dumplings)\n• Activities: Wearing new clothes (Seolbim), bowing to elders (Sebae) and paying respects at ancestors' graves (Seongmyo), playing Yutnori (a traditional board game)\n※ The day before, the day of, and the day after Seollal (Lunar December 30th, January 1st, 2nd) are national holidays.\n\n◉ Chuseok (Lunar August 15th)\n• Meaning: A day to give thanks for the year's harvest\n• Food: Newly harvested grains (from the fall) and Songpyeon (rice cakes)\n• Activities: Performing rites (Charye) and paying respects at ancestors' graves (Seongmyo), watching the moon, playing Ganggangsullae (traditional circle dance)\n※ The day before, the day of, and the day after Chuseok (Lunar August 14th, 15th, 16th) are national holidays.\n\n2. Public Holidays\n◉ January 1st: The first day of the solar New Year\n◉ Samiljeol (March 1st): A day to commemorate the nationwide independence movement that started on March 1, 1919, demanding independence from Japanese colonial rule\n◉ Buddha's Birthday (Lunar April 8th): The birthday of Buddha\n◉ Children's Day (May 5th): A holiday established to value the dignity of children and promote their happiness\n◉ Memorial Day (June 6th): A day to honor those who sacrificed their lives for the country, including the fallen soldiers of the Korean War\n\n◉ Gwangbokjeol (August 15th): The day Korea gained independence from Japanese colonial rule on August 15, 1945\n◉ Gaecheonjeol (October 3rd): A day to commemorate the founding of the Korean nation by the legendary figure Dangun. Gaecheonjeol means 'the day the sky opened.'\n◉ Hangul Day (October 9th): A day to celebrate King Sejong's creation of the Korean alphabet, Hangul, and promote its research and distribution\n\n◉ Christmas (December 25th): The birthday of Jesus Christ\n◉ Sunday\n◉ Temporary Holidays: Days temporarily designated by the government due to reasons like elections or overlapping holidays.",
  },

  CHINESE: {
    'guide-holiday': '公休日',
    'guide-holiday-detail':
      '1. 节日\n韩国有根据节日和季节庆祝的活动（岁时风俗）。韩国的日历同时使用阳历和阴历日期。节日和季节性活动主要是按照阴历进行的。\n\n◉ 春节（阴历1月1日）\n• 意义：阴历新年的第一天\n• 食物：年糕汤、饺子\n• 活动：穿新衣（春节服）、给长辈拜年（拜年）和扫墓（祖先的墓地），玩跳棋\n※ 春节前一天、春节当天、春节次日（阴历12月30日、1月1日、2日）是公共假期。\n\n◉ 中秋节（阴历8月15日）\n• 意义：感谢一年的丰收\n• 食物：新收获的谷物（秋季）和松饼\n• 活动：进行祭祖仪式（祭祖），扫墓，望月，玩强强手舞（传统舞蹈）\n※ 中秋节前一天、中秋节当天和中秋节次日（阴历8月14日、15日、16日）是公共假期。\n\n2. 公共假期\n◉ 1月1日：阳历新年第一天\n◉ 三一节（3月1日）：纪念1919年3月1日开始并全国扩散的大规模独立运动，要求独立\n◉ 佛诞节（阴历4月8日）：纪念释迦牟尼诞生的日子\n◉ 儿童节（5月5日）：为尊重儿童人格，促进儿童幸福而设立的纪念日\n◉ 珍国日（6月6日）：纪念为了国家牺牲的韩国战争阵亡者等\n\n◉ 光复节（8月15日）：1945年8月15日，韩国摆脱日本强占，独立的日子\n◉ 开天节（10月3日）：纪念韩民族的祖先檀君建国的日子。开天节意味着“天空开天”的日子\n◉ 韩文日（10月9日）：纪念世宗大王创建韩文并促进其研究和普及的日子\n\n◉ 圣诞节（12月25日）：耶稣基督的诞生日\n◉ 星期天\n◉ 临时假期：政府因公职人员选举、节日重叠等原因临时指定的假期。',
  },

  JAPANESE: {
    'guide-holiday': '祝日',
    'guide-holiday-detail':
      '1. 祝日\n韓国には祝日や季節に応じた行事（歳時風俗）がある。韓国ではカレンダーにおいて陽暦と陰暦の日付を両方使用している。祝日や季節の行事は主に陰暦で行われる。\n\n◉ ソルラル（陰暦1月1日）\n• 意味：陰暦の新年の始まりの日\n• 食べ物：トックク（餅スープ）、マンドゥ（餃子）\n• 行うこと：新しい服（ソルビム）を着る、目上の人にお辞儀（セベ）をし、先祖の墓参り（ソンミョ）、ユットノリ（伝統的なボードゲーム）をする\n※ ソルラルの前日、当日、翌日（陰暦12月30日、1月1日、2日）は祝日になる。\n\n◉ チュソク（陰暦8月15日）\n• 意味：一年の収穫に感謝する日\n• 食べ物：新しい収穫物（秋に収穫した穀物）とソンピョン（餅）\n• 行うこと：祭祀を行い、先祖の墓参りをする、月を観る、カンガンスルレ（伝統的な踊り）をする\n※ チュソクの前日、当日、翌日（陰暦8月14日、15日、16日）は祝日になる。\n\n2. 公休日\n◉ 1月1日：陽暦の新年の始まりの日\n◉ 三一節（3月1日）：1919年3月1日に始まり全国に広がった日本の強制占領時代に対する独立運動を記念する日\n◉ 仏誕節（陰暦4月8日）：釈迦の誕生日\n◉ 子供の日（5月5日）：子供の人格を尊重し、子供の幸せを促進するために制定された記念日\n◉ 顕忠日（6月6日）：韓国戦争で戦死した兵士を含む、国のために命を捧げた人々を追悼する日\n\n◉ 光復節（8月15日）：1945年8月15日に日本の強制占領から解放され、独立を果たした日\n◉ 開天節（10月3日）：韓民族の祖先である檀君が建国した日を記念する日。開天節は「天が開かれた日」という意味\n◉ ハングルの日（10月9日）：世宗大王のハングルの創製を記念し、ハングルの研究・普及を促進する日\n\n◉ クリスマス（12月25日）：イエス・キリストの誕生日\n◉ 日曜日\n◉ 臨時休日：公職者選挙、祝日と祝日が重なる場合など、政府が臨時で指定する日。',
  },
}
