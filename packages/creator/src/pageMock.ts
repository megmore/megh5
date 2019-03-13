import BUTTON_BG from './assets/btn.png'
import { ProjectData } from '@megh5/ui/types/core/constants'

const PreviewData: ProjectData = {
  name: 'testproject',
  version: '0.0.1',
  dependencies: [{
    '@megmore/es-helper': '^0.0.24'
  }, {
    '@megmore/scss-helper': '^0.0.4'
  }, {
    '@megmore/vui': '^0.0.2',
    'imports': ['HView', 'HButton', 'HFooter']
  }],
  mainPath: '0/0',
  UiNodes: [{
    name: 'HApp',
    path: '0/',
    nodeData: {
      props: {
        width: '100%',
        height: '100%',
        x: 0,
        y: 0
      }
    },
    children: [{
      name: 'HView',
      path: '0/0',
      nodeData: {
        props: {
          width: '100%',
          height: '100%',
          x: 0,
          y: 0,
          fontColor: '#000000',
          bgColor: 'transparent',
          bgImg: ''
        }
      },
      children: [{
        name: 'HButton',
        path: '0/0/0',
        nodeData: {
          props: {
            width: 100,
            height: 50,
            x: 0,
            y: 0,
            text: '哈哈哈',
            fontColor: '#ffffff',
            bgColor: '#000000',
            bgImg: ''
          }
        }
      }, {
        name: 'HButton',
        path: '0/0/1',
        nodeData: {
          props: {
            width: 100,
            height: 50,
            x: 10,
            y: 0,
            text: '嗯嗯呢',
            fontColor: '#ffffff',
            bgColor: 'transparent',
            bgImg: BUTTON_BG
          }
        }
      }, {
        name: 'HPromoCode',
        path: '0/0/2',
        nodeData: {
          props: {
            width: 300,
            height: 50,
            x: 0,
            y: 0,
            gift: 'data:image/png;base64,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',
            bgImg: 'data:image/png;base64,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',
            label: 'label',
            code: 'code'
          }
        }
      }, {
        name: 'HView',
        path: '0/0/3',
        nodeData: {
          props: {
            width: 300,
            height: 50,
            x: 0,
            y: 0,
            fontColor: '#000000',
            bgColor: 'transparent',
            bgImg: ''
          }
        }
      }]
    }, {
      name: 'HFooter',
      path: '0/1',
      nodeData: {
        props: {
          width: '100%',
          height: 100,
          x: 0,
          y: 0,
          logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABD8AAACpCAMAAAAbZ2YxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUxpcfeUHfeUHfeUHfeUHfeUHfeUHf////////////eUHfeUHfeUHf////////////////////eUHf///21+i7oAAAASdFJOUwBgENBAwICAQMCgkDBgoCBw8JLDaKMAAAUISURBVHja7dXtVoJAGIVRpjJw1Ozj/u+1/7VWYwdRRva5AOCtnt3w1cnGYc7GXs6cdeV56mSzrhyOu/Yajzi0n1AW/4i/1s3fKz8ex49tXDm8fLbXeMSu/YTXxT+CH/zgBz/4wQ9+8IMf/OAHP/jBD364kh/84Ac/+MEPfvCDH/zgBz/4wQ9+KIsf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/44Up+8IMf/OAHP/jBD37wgx/84Ac/+KEsfvCDH/xwJT/4wQ9+8IMf/OAHP/jBD37wgx/8UBY/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37ww5X84Ac/+MEPfvCDH/zgBz/4wQ9+8ENZ/OAHP/jBD37wgx/84Ac/fu59Wnqr8GPxK9/4wY+b7YKo9ld4zSVhLX7rKvxY/MpVfMQDjB/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP4wf/OjFjw9+8IMf/AjT3fODH/zgBz/4wQ9+8MP4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/GD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMfxg9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/ixVT9O+052dz8O/OAHP4IXrGJ392Oo/OAHP/iRplv5wQ9+8CNNt/KDH/zgR5pu5Qc/+MGPNN3KD37wgx9pupUf/OAHP9J0Kz/4wQ9+pOlWfvCDH/xI0z3wgx/84EeabuEHP/jBjzTdwg9+8IMfabqFH/zgBz/SdAs/+MEPfqTpFn7wgx/8SNMt/OAHP/iRplv4wQ9+8CNNt/CDH/zgR5pu4Qc/+MGPNN3CD37wgx9puoUf/OAHP9J0Cz/4wQ9+pOkWfvCDH/xI0y384Ac/+JGmW/jBD37wY5gNCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/8+HXluIZ14EcXH8EPftzWj3Hof/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz/4wQ9+8IMf/OAHP/jBD37wgx/84Ac/+MEPfvCDH/zgBz+268cqxo+rvOBtWsMeIN2nZ37wY3N+rGOP8K//AkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac/UkD4wQ9+8CMFhB/84Ac//gPIjh/84Ac/0lV+8IMf/JgPCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIDwgx/84EcKCD/4wQ9+pIBswY+xk03zfpjtF5yW/41ecCY/2jvu2hs2v/NN/uS/AavXS1yVdkuvAAAAAElFTkSuQmCC',
          termsLink: {
            text: 'Terms Of Service',
            href: 'http://www.onemt.com/abroadgame/outer/terms',
          },
          policyLink: {
            text: 'Privacy Policy',
            href: 'http://www.onemt.com/abroadgame/outer/policy',
          },
          copyright: 'Copyright 2019 onemt Limited All right reserved'
        },
        slot: 'footer'
      }
    }]
  }]
}

export default PreviewData
