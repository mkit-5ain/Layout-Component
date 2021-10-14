// webpack.config.js
// webpack 명령은 기본적으로 이 설정으로 시작
// entry = 번들을 설정하기 위한 진입점을 의미

const path = require( 'path' ); // 경로를 설정
const webpack = require( 'webpack' );
const folderPath = path.resolve(__dirname, "./");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // node_modules 에서 불러옴
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin 불러옴
// let fs = require('fs');
// const header = fs.readFileSync(__dirname + '/header.html');
// const footer = fs.readFileSync(__dirname + '/footer.html');

module.exports = {
    // 웹팩 v4부터는 mode 필수
    // mode 는 production, development, none 3가지 옵션이 존재
    // mode 의 production 은 각 설정마다 내장된 최적화 옵션을 자동으로 설정하여 준다
    mode : 'development',
    entry: {
        'js/index' : ['./src/js/index.js'],
        'js/module' : ['./src/js/module1.js', './src/js/module2.js'],  // 배열 사용(오른쪽부터 왼쪽으로 읽어감) }
        // vendor: ['lodash', 'jquery'], // webpack v4 이전 방식
    },
    output: {
         // filename 으로 생성된 번들링을 어느 경로에 생성할 지를 설정
         // __dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수
         // __이 붙어 있는 변수들은 항상 무엇인가를 담고있는 특별한 변수들임
         // path 에는 절대 경로 설정(절대값으로 static(정적)으로 사용)
         // filename: 'dist/[name].js',
         path: path.resolve(__dirname, 'dist'),
         filename: '[name].js', // 위에 지정한 entry 키의 이름에 맵핑되어 파일이 생성됨
         // chunkFilename : '[name].js' // webpack v4 이전 방식
    },
     // 로더를 지정하기 위한 module 정의
    module: {
        rules: [
            //module.rules 를 사용해 여러개의 로더 지정이 가능.
            {
                // test : 변환 할 파일을 지정
                // 정규 표현식으로 문자열 .css 확장자로 끝나는 것을 찾음.
                test: '/\.scss$/',///\.css$/,
                // use : 해당 파일에 적용할 로더의 이름
                // 로더에서 모듈 로딩 순서는 배열의 요소 오른쪽에서 왼쪽으로 로딩하며 진행
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

                    // sass-loader : 기본적으로 node-sass 를 사용하여 sass 를 css 로 컴파일하는 역할
                    'css-loader',

                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            indentType: 'tab', // 정의되어 있지 않으면 기본값은 space
                            indentWidth: 1 // 기본값 2
                        }
                    }
                ],
                // exclude 는 제외할 폴더나 파일
                // 다른 모듈을 사용해서 컴파일하지 않도록 지정(안전성 확보)
                exclude: /node_modules/
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: false,
            hash: true,
            // header: header,
            // footer: footer,
            HTML_PATH: folderPath,
        }),

        // 모든 라이브러리 불러옴
        new webpack.ProvidePlugin({
            // 라이브러리 코딩
            $: 'jquery',
            jQ: 'jquery',
            moment: 'moment'
        }),

        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })
    ],
    // optimization 로 중복된 모듈 없애기
    optimization: {
        // splitting duplicated chunk
        // 전체 응용 프로그램의 vendors 모든 코드를 포함 하는 청크
        // 즉, 자주 사용되어 중복으로 import 된 모듈을 별도의 chunk 파일로 생성하기 위한 설정이다.
        // 번들 파일을 적절히 분리함으로써 브라우저 캐시를 전략적으로 활용할 수 있어 초기 로딩속도를 최적화 할수 있다.
        splitChunks: {
            //cacheGroups: 명시적으로 특정 파일들을 청크로 분리할 때 사용
            cacheGroups: {
                vendors: {
                    // 대상이 되는 파일 지정 (node_modules 디렉토리에 있는 파일이 대상)
                    test: /[\\/]node_modules[\\/]/,
                    // 비동기 및 동기 모듈을 통한 최적화(test 조건에 포함되는 모든 것을 분리하겠다는 뜻)
                    chunks: 'all',
                    // 처크로 분리할 때 이름으로 사용될 파일명
                    name: 'js/vendor/libs'
                }
            }
        }
    },
    devServer: {
        proxy: {
            '/api': '175.113.117.233'
        }
    }
};
