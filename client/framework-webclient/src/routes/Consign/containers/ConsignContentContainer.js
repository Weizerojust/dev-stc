import React, {Component} from 'react';
import ConsignContentComponent from "../components/ConsignContentComponent";
import {connect} from "react-redux";
import {getConsign, updateConsign, putConsignState} from "../../../services/ConsignService";


const mapStateToProps = (state, ownProps) => {
    // debugger;
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    // console.log(authData);
    const consignation = state.Consign.listMap[ownProps.id].consignation;
    return {
        // consignData: {},/*fetch data with pro id*/
        consignData: state.Consign.listMap[ownProps.id],
        values: consignation ? JSON.parse(consignation) : {},
        disable: authData.functionGroup["Consign"]===undefined||authData.functionGroup["Consign"].findIndex(element => element === "EDIT")===-1,
        curKey: state.Layout.activeKey /*TODO: 将当前页面id保存为组件静态变量，通过此id获取页面内容*/
    }
};

const buttons = (dispatch,isVisible) => [{
    content: '保存',
    onClick: (consignData,consignation) =>{
        const valueData = {
            id: consignData.id,
            consignation: consignation
        };
        updateConsign(dispatch,valueData);
    },
    enable: isVisible
},{
    content: '提交',
    onClick: (consignData,consignation) =>{

    },
    enable: isVisible
},{
    content: '通过',
    onClick: (consignData) =>{

    },
    enable: !isVisible
},{
    content: '否决',
    onClick: (consignData) =>{

    },
    enable: !isVisible
}];

const mapDispatchToProps = (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('authData'));
    const isVisible = authData.functionGroup["Consign"]!==undefined&&authData.functionGroup["Consign"].findIndex(element => element === "EDIT")!==-1;
    return {
        buttons: buttons(dispatch,isVisible).filter(button => button.enable===true),
        getValues: (id) => getConsign(dispatch,id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsignContentComponent);
