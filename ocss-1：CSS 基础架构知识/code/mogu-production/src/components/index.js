import {Layout, Header, Aside, Content, Footer} from './layout';
import Category from './category';
import FootNav from './foot-nav';
import Col from 'vant/lib/col';
import 'vant/lib/col/index.css';
import Row from 'vant/lib/row';
import 'vant/lib/row/index.css';
import { 
  SvgCheck,
  SvgSearch, 
  SvgButton, 
  SvgHome,
  SvgMore, 
  SvgStar,
  SvgTheme,
  SvgThumbs,
  SvgShare,
  SvgLeft,
  SvgTips
} from './svg-icon';
import Avatar from './avatar';
import BoxSkin from './box-skin';
import Button from './button';
import Columns from './columns';
import FastMenu from './fast-menu';
import Launch from './launch';
import Search from './search';
import Magazine from './magazine';

const components = {
  Layout,
  Header,
  Aside,
  Footer,
  Category,
  Content,
  FootNav,
  FastMenu,
  CRow: Row,
  CCol: Col,
  SvgCheck,
  SvgSearch,
  SvgButton,
  SvgHome,
  SvgMore,
  SvgStar,
  SvgTheme,
  SvgThumbs,
  SvgShare,
  SvgLeft,
  SvgTips,
  Avatar,
  BoxSkin,
  Button,
  Columns,
  Launch,
  Search,
  Magazine
}

const install = (app) => {
  Object.keys(components).forEach(key => {
    if(key === 'CRow' || key === 'CCol') {
      app.component(key, components[key])
    }else{
      app.component(components[key]['name'], components[key])
    }
  });
}

const mgjUI = {
  install
}

export default mgjUI