package com.sinosteel.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sinosteel.activiti.ProcessInstanceService;
import com.sinosteel.domain.TestRecord;
import com.sinosteel.repository.TestRecordRepository;
import com.sinosteel.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

/**
 * @author LBW & SQW
 */

@Service
public class TestRecordService extends BaseService<TestRecord> {
    @Autowired
    private TestRecordRepository testRecordRepository;

    @Autowired
    private ProcessInstanceService processInstanceService;


    //以工程为来源查询testRecord，但是工程那里并没有设置好，TODO:设置好工程
    /*public JSON queryTestRecords(User user) throws Exception {
        if (user != null)
            System.out.println("queryTestRecords--> query user role: " + user.getRoles().get(0).getRoleName());
        if (user.getRoles().get(0).getRoleName().equals("普通客户"))
        {
            List<TestRecord> testRecords = user.getTestRecords();
            //TODO:对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestRecords(testRecords);
        }
        else
        {
            List<TestRecord> testRecords = testRecordRepository.findByAllTestRecords();
            //对测试结果进行处理，去掉具体内容,并且添加测试结果状态
            return processTestRecords(testRecords);
        }
    }*/

    public JSONObject queryTestRecordByID(String id) throws Exception{
        TestRecord testRecord = testRecordRepository.findById(id);
        if (testRecord == null)
            throw new Exception("Not found");
        return JSON.parseObject(JSONObject.toJSONString(testRecord));
    }

    //改动测试结果
    public JSONObject editTestRecord(JSONObject params, List<MultipartFile> files, User user) throws Exception
    {
        TestRecord temptestRecord = JSONObject.toJavaObject(params, TestRecord.class);
        TestRecord testRecord;
        if ((testRecord = this.findEntityById(temptestRecord.getId())) == null) {
            throw new Exception("Not found");
        }
        //编辑测试结果时只编辑内容
        testRecord.setRecord(temptestRecord.getRecord());
        this.updateEntity(testRecord, user);

        //TODO:return the testRecord with STATE!
        testRecord = testRecordRepository.findById(temptestRecord.getId());
        return processTestRecord(testRecord);
    }

    //增加测试结果
    public JSONObject addTestRecord(JSONObject params,List<MultipartFile> files,User user) throws Exception {

        String uid=UUID.randomUUID().toString();

        TestRecord testRecord=JSONObject.toJavaObject(params,TestRecord.class);
        testRecord.setId(uid);
        /*testRecord.setUser(user);*/

        //TODO:start activiti process
        //String procID = processInstanceService.createTestRecordProcess(params, user);
        //testRecord.setProcessInstanceID(procID);
        this.saveEntity(testRecord, user);

        //TODO:添加testRecord状态
        testRecord = testRecordRepository.findById(uid);
        return processTestRecord(testRecord);
    }


    //删除测试结果（不删除相关测试结果文件?）

    public void deleteTestRecord(JSONObject params)
    {
        String uid=params.getString("id");
        this.deleteEntity(uid);
    }


    //TODO:增加测试结果状态
    private JSONObject processTestRecord(TestRecord testRecord) throws Exception {
        //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
        JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testRecord));
        //jsonObject.put("state", processState);
        return jsonObject;

    }

    //去掉测试结果内容,TODO:添加状态
    private  JSONArray processTestRecords(List<TestRecord> testRecords) throws Exception {
        JSONArray resultArray = new JSONArray();
        for (TestRecord testRecord: testRecords) {
            JSONObject jsonObject = JSON.parseObject(JSONObject.toJSONString(testRecord));
            jsonObject.remove("testRecord");
            //String processState = (String) processInstanceService.queryProcessState(testRecord.getProcessInstanceID()).get("state");
            //jsonObject.put("state", processState);
            resultArray.add(jsonObject);
        }

        return resultArray;
    }
}