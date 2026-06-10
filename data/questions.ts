import { Question } from "@/types";

export const questions: Question[] = [
  // ── AIの定義・歴史 ──────────────────────────────────────────────────
  {
    id: "ai-001",
    category: "ai-basics",
    text: "1956年にジョン・マッカーシーらが開催し、「人工知能（Artificial Intelligence）」という言葉が初めて公式に使われた会議はどれか。",
    choices: [
      "チューリングテスト発表会議",
      "ダートマス会議",
      "サイバネティクス国際会議",
      "ACM設立シンポジウム",
    ],
    correctIndex: 1,
    explanation:
      "1956年にニューハンプシャー州ダートマス大学で開催された「ダートマス会議」が、AIという用語の起源とされています。ジョン・マッカーシー、マービン・ミンスキー、クロード・シャノンらが参加し、機械に知的な行動をさせるという研究の方向性を定めました。",
  },
  {
    id: "ai-002",
    category: "ai-basics",
    text: "AIの歴史における「第2次AIブーム」の主な特徴として最も適切なものはどれか。",
    choices: [
      "ディープラーニングによる画像認識の飛躍的向上",
      "エキスパートシステムと知識表現の研究が中心",
      "パーセプトロンの発明による機械学習の始まり",
      "ビッグデータと計算資源の活用",
    ],
    correctIndex: 1,
    explanation:
      "第2次AIブーム（1980年代）は、専門家の知識をルールとして記述するエキスパートシステムが主流でした。医療診断や化学物質の分析など実用化も進みましたが、知識の取得・更新コストの高さ（知識獲得のボトルネック）により限界を迎えました。第3次ブームがディープラーニング主導の現在です。",
  },

  // ── 機械学習 ────────────────────────────────────────────────────────
  {
    id: "ml-001",
    category: "machine-learning",
    text: "教師あり学習において、モデルが訓練データに過度に適合し、未知データへの汎化性能が低下する現象を何というか。",
    choices: ["アンダーフィッティング", "バイアス増大", "過学習（オーバーフィッティング）", "正則化"],
    correctIndex: 2,
    explanation:
      "過学習（Overfitting）とは、モデルが訓練データのノイズや細かいパターンまで学習しすぎてしまい、新しいデータへの予測精度が低くなる現象です。対策としてはDropout、L1/L2正則化、データ拡張、早期停止（Early Stopping）などが用いられます。",
  },
  {
    id: "ml-002",
    category: "machine-learning",
    text: "決定木において、分岐の基準として使われる不純度の指標のうち、クラスの確率 p_i を用いて −Σ p_i log p_i で計算されるものはどれか。",
    choices: ["ジニ係数（Gini impurity）", "情報エントロピー", "分散", "F値"],
    correctIndex: 1,
    explanation:
      "情報エントロピー（Shannon entropy）は −Σ p_i log₂ p_i で定義され、ノードの不純度を表します。全サンプルが同一クラスの場合は0、クラスが均等に分布する場合に最大値をとります。決定木ではこのエントロピーの減少量（情報利得）が最大になる特徴量・閾値で分岐を決めます。",
  },
  {
    id: "ml-003",
    category: "machine-learning",
    text: "教師なし学習の代表的な手法であるk-meansクラスタリングに関する説明として、最も適切なものはどれか。",
    choices: [
      "クラスタ数kを自動的に決定できる",
      "各データ点を最も近いセントロイドに割り当て、セントロイドを繰り返し更新する",
      "階層的クラスタリングの一種である",
      "外れ値に対して非常に頑健である",
    ],
    correctIndex: 1,
    explanation:
      "k-meansはk個のセントロイド（重心）を初期化し、①各点を最近傍セントロイドに割り当て、②各クラスタの重心を再計算、という2ステップを収束まで繰り返すアルゴリズムです。クラスタ数kは事前に指定する必要があり、外れ値の影響を受けやすいという特性があります。",
  },

  // ── ディープラーニング ──────────────────────────────────────────────
  {
    id: "dl-001",
    category: "deep-learning",
    text: "2012年のILSVRC（ImageNet Large Scale Visual Recognition Challenge）において、従来手法を大きく上回る成績でディープラーニングの実力を世界に示したモデルはどれか。",
    choices: ["VGGNet", "AlexNet", "GoogLeNet（Inception）", "ResNet"],
    correctIndex: 1,
    explanation:
      "AlexNet（Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton）は2012年のILSVRCで、エラー率を従来の約26%から約16%へ劇的に改善しました。ReLU活性化関数・Dropout・GPU並列学習・データ拡張などを組み合わせた点が革新的で、その後のディープラーニングブームの火付け役となりました。",
  },
  {
    id: "dl-002",
    category: "deep-learning",
    text: "Transformerアーキテクチャの中核をなすメカニズムとして、入力系列の各要素が他のすべての要素との関連度を動的に計算する仕組みを何というか。",
    choices: ["畳み込み（Convolution）", "再帰接続（Recurrent connection）", "自己注意機構（Self-Attention）", "残差接続（Residual connection）"],
    correctIndex: 2,
    explanation:
      "Self-Attention（自己注意機構）は、Query・Key・Valueの3つの行列を用いて系列内の各トークン間の関連度スコアを計算し、それを重みとした加重和を出力します。位置に依存せず長距離依存関係を捉えられるため、GPTやBERTなどの大規模言語モデルの基盤となっています。",
  },
  {
    id: "dl-003",
    category: "deep-learning",
    text: "生成モデルの一種で、生成器（Generator）と識別器（Discriminator）が互いに競い合うことで高品質なデータを生成する手法はどれか。",
    choices: [
      "変分オートエンコーダ（VAE）",
      "敵対的生成ネットワーク（GAN）",
      "拡散モデル（Diffusion Model）",
      "ボルツマンマシン",
    ],
    correctIndex: 1,
    explanation:
      "GAN（Generative Adversarial Network）はIan Goodfellowらが2014年に提案しました。GeneratorはDiscriminatorを騙すようなリアルなデータを生成しようとし、Discriminatorは本物と偽物を見分けようとします。この対抗学習により、高解像度の画像生成や画像変換などで優れた結果を示しています。",
  },

  // ── 社会実装・法律・倫理 ────────────────────────────────────────────
  {
    id: "law-001",
    category: "social-implementation",
    text: "日本の著作権法において、情報解析（テキスト・データマイニング）を目的とする場合、著作権者の許諾なく著作物を複製・利用できる根拠となる条文はどれか。",
    choices: [
      "第30条（私的使用のための複製）",
      "第32条（引用）",
      "第30条の4（著作物に表現された思想・感情の享受を目的としない利用）",
      "第47条の5（電子計算機による情報処理）",
    ],
    correctIndex: 2,
    explanation:
      "2019年の著作権法改正で新設された第30条の4は、「著作物に表現された思想・感情の享受を目的としない利用」について権利者の許諾なく行えると定めており、AI学習目的のデータ収集・複製がこれに該当します。ただし著作権者の利益を不当に害する場合は適用外となります。",
  },
  {
    id: "law-002",
    category: "social-implementation",
    text: "AIの意思決定に関する説明責任・透明性を高めるアプローチとして、モデルの予測理由を特定の入力サンプルに対して局所的に近似・説明する手法はどれか。",
    choices: [
      "SHAP（SHapley Additive exPlanations）",
      "LIME（Local Interpretable Model-agnostic Explanations）",
      "GradCAM",
      "Attention Visualization",
    ],
    correctIndex: 1,
    explanation:
      "LIME（Marco Tulio Ribeiroら、2016年）は、特定の予測に対してその近傍データを生成し、解釈可能な線形モデルで局所近似することで「なぜその予測をしたか」を説明します。モデルに依存しないモデル非依存（model-agnostic）手法である点が特徴です。SHAPはゲーム理論のShapley値を用いた別の説明可能性手法です。",
  },

  // ── 数学・統計 ──────────────────────────────────────────────────────
  {
    id: "math-001",
    category: "math-statistics",
    text: "ニューラルネットワークの学習で使われる確率的勾配降下法（SGD）について、最も適切な説明はどれか。",
    choices: [
      "全訓練データの勾配を毎回計算してパラメータを更新する",
      "ミニバッチと呼ばれる小さなデータ部分集合の勾配でパラメータを更新する",
      "勾配を使わずパラメータをランダムに更新する",
      "損失関数の二階微分（ヘッセ行列）を用いてパラメータを更新する",
    ],
    correctIndex: 1,
    explanation:
      "実際によく使われるのは「ミニバッチSGD」で、全データではなくランダムに抽出したミニバッチ（例：32〜256件）の勾配でパラメータを更新します。全データ使用（バッチ勾配降下法）と比べて計算コストが低く、勾配のノイズが正則化効果をもたらすこともあります。Adam・RMSPropなどはSGDを改良した最適化手法です。",
  },
  {
    id: "math-002",
    category: "math-statistics",
    text: "分類問題の性能評価指標において、真陽性（TP）・偽陽性（FP）・偽陰性（FN）を用いて定義されるF1スコアの計算式として正しいものはどれか。",
    choices: [
      "F1 = TP / (TP + FP)",
      "F1 = TP / (TP + FN)",
      "F1 = 2TP / (2TP + FP + FN)",
      "F1 = (TP + TN) / (TP + TN + FP + FN)",
    ],
    correctIndex: 2,
    explanation:
      "F1スコアは適合率（Precision = TP/(TP+FP)）と再現率（Recall = TP/(TP+FN)）の調和平均で、F1 = 2×Precision×Recall / (Precision+Recall) = 2TP/(2TP+FP+FN) と表されます。不均衡クラス問題でAccuracyより有用な指標です。なお最後の選択肢は正解率（Accuracy）の式です。",
  },
];

export const questionsByCategory = questions.reduce(
  (acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  },
  {} as Record<string, Question[]>
);
