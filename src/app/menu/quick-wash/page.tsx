import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'quick-wash',
    rank: '梅',
    name: 'クイックウォッシュ',
    time: '約30分',
    description: 'スノーフォームによるノータッチ洗車。室内拭き上げ付き。忙しい方でも手軽にプロの洗車を体験できます。スノーフォームが塗装面に優しく密着し、擦らずに汚れを浮かせて洗い流します。',
    image: '/images/quick-wash.png',
    accentColor: '#1a3a8f',
    bgColor: '#e8edf8',
    prices: {
        SS: '¥3,300',
        S: '¥4,400',
        M: '¥5,500',
        L: '¥6,600',
        LL: '¥8,800',
        XL: '¥11,000',
    },
    features: [
        '擦らないノータッチ洗車で塗装を傷めない',
        '室内拭き上げ・ダッシュボード清掃込み',
        '約30分のスピード施工',
        '定期的なメンテナンスに最適',
    ],
    includes: [
        'スノーフォーム洗車（外装全体）',
        '高圧洗浄による下回り洗浄',
        'ホイール・タイヤ洗浄',
        '室内拭き上げ',
        'ダッシュボード・コンソール清掃',
        'ドアジャム清掃',
    ],
    products: [
        'ながら洗車公認スノーフォーム',
        '専用マイクロファイバークロス',
        'ホイール用中性クリーナー',
    ],
};

export default function QuickWashPage() {
    return <MenuDetailPage menu={menuData} />;
}
