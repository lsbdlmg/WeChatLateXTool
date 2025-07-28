export const Symbols = [
  //希腊字母
  {
    id: 'ShortCutTools-1',
    IsLeft: true,
    DropDownTitle: '希腊',
    TitleCaseLetters: [
      {
        title: '小写LowerCase',
        case: 'lower',
        letters: {
          alpha: '\\alpha', // α
          beta: '\\beta', // β
          gamma: '\\gamma', // γ
          delta: '\\delta', // δ
          epsilon: '\\epsilon', // ε
          varepsilon: '\\varepsilon', // ϵ (变体)
          zeta: '\\zeta', // ζ
          eta: '\\eta', // η
          theta: '\\theta', // θ
          vartheta: '\\vartheta', // ϑ (变体)
          iota: '\\iota', // ι
          kappa: '\\kappa', // κ
          lambda: '\\lambda', // λ
          mu: '\\mu', // μ
          nu: '\\nu', // ν
          xi: '\\xi', // ξ
          omicron: '\\omicron', // ο
          pi: '\\pi', // π
          varpi: '\\varpi', // ϖ (变体)
          rho: '\\rho', // ρ
          varrho: '\\varrho', // ϱ (变体)
          sigma: '\\sigma', // σ
          varsigma: '\\varsigma', // ς (词尾变体)
          tau: '\\tau', // τ
          upsilon: '\\upsilon', // υ
          phi: '\\phi', // φ
          varphi: '\\varphi', // ϕ (变体)
          chi: '\\chi', // χ
          psi: '\\psi', // ψ
          omega: '\\omega', // ω
        },
      },
    ],
  },
  //基本运算符
  {
    id: 'ShortCutTools-2',
    IsLeft: true,
    DropDownTitle: '运算',
    TitleCaseLetters: [
      {
        title: '二元运算符',
        case: 'binaryOperators',
        letters: {
          Plus: '+', // +
          Minus: '-', // -
          Multiply: '\\times', // ×
          Divide: '\\div', // ÷
          PlusMinus: '\\pm', // ±
          MinusPlus: '\\mp', // ∓
          Dot: '\\cdot', // ·
          Asterisk: '\\ast', // ∗
          Union: '\\cup', // ∪
          Intersection: '\\cap', // ∩
          Delta: '\\Delta', // Δ
          Nabla: '\\nabla', // ∇
          Partial: '\\partial', // ∂
          Superset: '\\supset', // ⊃
          Subset: '\\subset', // ⊂
          NotSubset: '\\not\\subset', // ⊄
          Circle: '\\circ', // ○
        },
      },
      {
        title: '二元关系符',
        case: 'binaryRelations',
        letters: {
          Equals: '=', // =
          NotEquals: '\\neq', // ≠
          Approx: '\\approx', // ≈
          Identical: '\\equiv', // ≡
          LessThan: '<', // <
          GreaterThan: '>', // >
          LessOrEqual: '\\leq', // ≤
          GreaterOrEqual: '\\geq', // ≥
          MuchLess: '\\ll', // ≪
          MuchGreater: '\\gg', // ≫
          ElementOf: '\\in', // ∈
          RightArrow: '\\rightarrow', // →
          Angle: '\\angle', // ∠
        },
      },
      {
        title: '大型运算',
        case: 'large-operators',
        letters: {
          sum: '\\sum_{i=1}^n', // 求和符号 \sum_{i=1}^n
          product: '\\prod_{i=1}^n', // 求积符号 \prod_{i=1}^n
          union: '\\bigcup_{i=1}^n', // 并集符号 \bigcup_{i=1}^n
          intersection: '\\bigcap_{i=1}^n', // 交集符号 \bigcap_{i=1}^n
        },
      },
    ],
  },

  //分式微分
  {
    id: 'ShortCutTools-4',
    IsLeft: true,
    DropDownTitle: '分式',
    TitleCaseLetters: [
      {
        title: '分式微分',
        case: 'fractions', // 不分大小写
        letters: {
          // 分式
          fraction: '\\frac{a}{b}', // 普通分式 \frac{a}{b}

          // 导数
          derivative: '\\frac{dy}{dx}', // 一阶导数 \frac{dy}{dx}
          partial: '\\frac{\\partial f}{\\partial x}', // 偏导数 \frac{\partial f}{\partial x}
          ddx: '\\frac{d}{dx}', // 微分算子 \frac{d}{dx}
          d2dx2: '\\frac{d^2}{dx^2}', // 二阶导数 \frac{d^2}{dx^2}

          // 积分
          integral: '\\int f(x) dx', // 不定积分 \int f(x) dx
          definite_integral: '\\int_a^b f(x) dx', // 定积分 \int_a^b f(x) dx
          double_integral: '\\iint f(x,y) dx dy', // 二重积分 \iint f(x,y) dx dy
          triple_integral: '\\iiint f(x,y,z) dx dy dz', // 三重积分 \iiint f(x,y,z) dx dy dz

          // 极限
          limit: '\\lim_{x \\to 0}', // 极限 \lim_{x \to 0}
          max: '\\max', // 最大值 \max
          min: '\\min', // 最小值 \min
          sup: '\\sup', // 上确界 \sup
          inf: '\\inf', // 下确界 \inf
          // 其他微分符号
          gradient: '\\nabla f', // 梯度 \nabla f
          divergence: '\\nabla \\cdot \\mathbf{F}', // 散度 \nabla \cdot \mathbf{F}
          curl: '\\nabla \\times \\mathbf{F}', // 旋度 \nabla \times \mathbf{F}
          laplacian: '\\Delta f', // 拉普拉斯算子 \Delta f
        },
      },

      {
        title: '求导',
        case: 'derivatives',
        letters: {
          prime: "f'(x)", // 一阶导数 f'(x)
          double_prime: "f''(x)", // 二阶导数 f''(x)
          triple_prime: "f'''(x)", // 三阶导数 f'''(x)
          nth_prime: 'f^{(n)}(x)', // n阶导数 f^{(n)}(x)
          yprime: "y'", // 一阶导数 y'
          ydouble_prime: "y''", // 二阶导数 y''
          ytriple_prime: "y'''", // 三阶导数 y'''
          ynth_prime: 'y^{(n)}', // n阶导数 y^{(n)}(
        },
      },
    ],
  },
  //三角函数
  {
    id: 'ShortCutTools-5',
    IsLeft: true,
    DropDownTitle: '三角',
    TitleCaseLetters: [
      {
        title: '三角函数',
        case: 'trigonometric-functions',
        letters: {
          sin: '\\sin', // 正弦函数 \sin
          cos: '\\cos', // 余弦函数 \cos
          tan: '\\tan', // 正切函数 \tan
          csc: '\\csc', // 余割函数 \csc
          sec: '\\sec', // 正割函数 \sec
          cot: '\\cot', // 余切函数 \cot
          degree: '^\\circ', // 角度符号 ^\circ (如 90^\circ)
        },
      },
      {
        title: '反三角函数',
        case: 'inverse-trigonometric-functions',
        letters: {
          arcsin: '\\arcsin', // 反正弦函数 \arcsin
          arccos: '\\arccos', // 反余弦函数 \arccos
          arctan: '\\arctan', // 反正切函数 \arctan
          arccsc: '\\operatorname{arccsc} ', // 反正弦函数 \arccsc
          arcsec: '\\operatorname{arcsec} ', // 反余弦函数 \arcsec
          arccot: '\\operatorname{arccot} ', // 反正切函数 \arccot
          arcsin_alt: '\\sin^{-1}', // 反正弦函数 \sin^{-1}
          arccos_alt: '\\cos^{-1}', // 反余弦函数 \cos^{-1}
          arctan_alt: '\\tan^{-1}', // 反正切函数 \tan^{-1}
          arccsc_alt: '\\csc^{-1}', // 反余割函数 \csc^{-1}
          arcsec_alt: '\\sec^{-1}', // 反正割函数 \sec^{-1}
          arccot_alt: '\\cot^{-1}', // 反余切函数 \cot^{-1}
        },
      },
      {
        title: '双曲函数',
        case: 'hyperbolic-functions',
        letters: {
          sinh: '\\sinh', // 双曲正弦
          cosh: '\\cosh', // 双曲余弦
          tanh: '\\tanh', // 双曲正切
          csch: '\\operatorname{csch}', // 双曲余割
          sech: '\\operatorname{sech}', // 双曲正割
          coth: '\\coth', // 双曲余切
        },
      },
      {
        title: '反双曲函数',
        case: 'inverse-hyperbolic-functions',
        letters: {
          arcsinh_alt: '\\sinh^{-1}',
          arccosh_alt: '\\cosh^{-1}',
          arctanh_alt: '\\tanh^{-1}',
          arccsch_alt: '\\operatorname{csch^{-1}}',
          arcsech_alt: '\\operatorname{sech^{-1}}',
          arccoth_alt: '\\coth^{-1}',
        },
      },
    ],
  },
  //箭头
  {
    id: 'ShortCutTools-3',
    IsLeft: false,
    DropDownTitle: '箭头',
    TitleCaseLetters: [
      {
        title: '箭头符号',
        case: 'arrowLetter',
        letters: {
          right: '\\rightarrow', // →
          left: '\\leftarrow', // ←
          up: '\\uparrow', // ↑
          down: '\\downarrow', // ↓
          upRight: '\\nearrow', // ↗
          upLeft: '\\nwarrow', // ↖
          downRight: '\\searrow', // ↘
          downLeft: '\\swarrow', // ↙
          rightDouble: '\\Rightarrow', // ⇒
          leftDouble: '\\Leftarrow', // ⇐
          upDouble: '\\Uparrow', // ⇑
          downDouble: '\\Downarrow', // ⇓
          leftRight: '\\leftrightarrow', // ↔
          upDown: '\\updownarrow', // ↕
          upDownLeftRight: '\\rightleftarrows', // ⇄
          leftRightDouble: '\\Leftrightarrow', // ⇔
          upDownDouble: '\\Updownarrow', // ⇕
          leftRightDoubleStroke: '\\rightleftharpoons', // ⇎
          rightLeftDoubleStroke: '\\leftrightharpoons', // ⇏
          rightCurve: '\\hookrightarrow', // ↪
          leftCurve: '\\hookleftarrow', // ↩
          rightDash: '\\dashrightarrow', // ⇢
          rightHook: '\\rightharpoonup', // ↬
          rightLoop: '\\looparrowright', // ↬
        },
      },
    ],
  },
  //根式
  {
    id: 'ShortCutTools-7',
    IsLeft: false,
    DropDownTitle: '根式',
    TitleCaseLetters: [
      {
        title: '根式',
        case: 'radicals',
        letters: {
          sqrt: '\\sqrt{x}', // 平方根 \sqrt{x}
          nth_root: '\\sqrt[n]{x}', // n次方根 \sqrt[n]{x}
          cube_root: '\\sqrt[3]{x}', // 立方根 \sqrt[3]{x}
          quad_root: '\\sqrt[4]{x}', // 四次方根 \sqrt[4]{x}
          radical: '\\surd', // 根号 \surd
        },
      },
    ],
  },
  //矩阵
  {
    id: 'ShortCutTools-6',
    IsLeft: false,
    DropDownTitle: '矩阵',
    TitleCaseLetters: [
      {
        title: '基础矩阵',
        case: 'basic-matrices',
        letters: {
          matrix_2x2: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', // 2x2矩阵（圆括号）
          matrix_3x3: '\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}', // 3x3矩阵（方括号）
          matrix_plain: '\\begin{matrix} a & b \\\\ c & d \\end{matrix}', // 无括号矩阵
          matrix_curly: '\\begin{Bmatrix} a & b \\\\ c & d \\end{Bmatrix}', // 花括号矩阵
          matrix_vertical: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}', // 行列式（单竖线）
          matrix_double_vertical: '\\begin{Vmatrix} a & b \\\\ c & d \\end{Vmatrix}', // 范数（双竖线）
          undermark: '_n',
        },
      },
    ],
  },
  //其他
  {
    id: 'ShortCutTools-8',
    IsLeft: false,
    DropDownTitle: '其他',
    TitleCaseLetters: [
      {
        title: '其他符号',
        case: 'otherLetter',
        letters: {
          Period: '.', // .
          Comma: ',', // ,
          Semicolon: ';', // ;
          Colon: ':', // :
          Exclamation: '!', // !
          Question: '?', // ?
          DoubleQuote: '"', // "
          SingleQuote: "'", // '
          Backtick: '`', // `
          Tilde: '\\sim', // ~
          Caret: '\\hat{}', // ^
          Equals: '=', // =
          Dollar: '\\$', // $
          Percent: '\\%', // %
          Ampersand: '\\&', // &
          Hash: '\\#', // #
          At: '@', // @
          Backslash: '\\backslash', // \
          Pipe: '|', // |
          Underscore: '\\_', // _
          LeftBrace: '\\{', // {
          RightBrace: '\\}', // }
          LeftBracket: '[', // [
          RightBracket: ']', // ]
          LeftParenthesis: '(', // (
          RightParenthesis: ')', // )
          AngleLeft: '<', // <
          AngleRight: '>', // >
          Because: '\\because', // ∵
          Therefore: '\\therefore', // ∴
        },
      },
    ],
  },
]
