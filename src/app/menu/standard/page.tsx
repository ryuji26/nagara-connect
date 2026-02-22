import MenuDetailPage from '../MenuDetailPage';
import type { MenuData } from '../MenuDetailPage';

const menuData: MenuData = {
    id: 'standard',
    rank: 'BASIC',
    name: 'NAGARA スタンダード洗車',
    time: '約60分',
    description: '当日の状態に合わせて最適な洗車をご提案します。スノーバブル泡洗車から始まり、お車の状態に適したシャンプーで優しく洗い上げ、ビギナーズラックで美しく仕上げます。',
    image: '/images/quick-wash.png',
    accentColor: '#1a3a8f',
    bgColor: '#e8edf8',
    prices: { SS: '¥3,200', S: '¥3,600', M: '¥4,000', L: '¥4,600', LL: '¥5,200', XL: '¥6,000' },
    features: ['外装ボディのみのフォーカス施工', 'お車の状態に合わせたケミカル選択', '約60分のスピーディな施工'],
    includes: ['スノーバブル泡洗車', 'スノーシャンプー（またはシリコンシャンプー）', 'ビギナーズラック仕上げ'],
    products: ['スノーバブル', 'スノーシャンプー / シリコンシャンプー', 'ビギナーズラック'],
    steps: [
        { title: '状態の確認・足回り洗浄', desc: 'お車の状態を確認し、最適なケミカルを選定します。その後、足回りの汚れを念入りに落とします。' },
        { title: 'スノーバブル・予備洗浄', desc: 'たっぷりの泡でボディ全体を包み込み、浮かせた汚れを高圧洗浄で優しく洗い流します。' },
        { title: 'こだわりシャンプー洗車', desc: 'お車の状態に合わせた専用シャンプー（スノー/シリコン等）を使用し、ムートンで全体を優しく手洗いします。' },
        { title: 'ビギナーズラック仕上げ', desc: '最後に簡易コーティング剤でボディを整え、手軽に艶と撥水性を復活させます。' }
    ]
};

export default function StandardPage() { return <MenuDetailPage menu={menuData} />; }
