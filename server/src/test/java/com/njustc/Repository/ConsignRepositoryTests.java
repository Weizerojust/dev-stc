package com.njustc.Repository;

import com.njustc.FrameworkApplication;
import com.njustc.domain.Consign;
import com.njustc.domain.Project;
import com.njustc.repository.ConsignRepository;
import com.njustc.repository.ProjectRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 这个类用来测试consign类对应repository的增删查功能<br>
 * <table border="1" summary="">
 *     <tr>
 *     <th><b>测试内容</b></th>
 *     <th><b>对应操作</b></th>
 *     <th><b>测试结果</b></th>
 *     </tr>
 *     <tr>
 *         <td>新建委托</td>
 *         <td>new + save</td>
 *         <td>FindById成功</td>
 *     </tr>
 *     <tr>
 *         <td>删除委托</td>
 *         <td>delete对应Id</td>
 *         <td>FindById为空</td>
 *     </tr>
 * </table>
 * @author FW
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(FrameworkApplication.class)
public class ConsignRepositoryTests {

    @Autowired
    private ConsignRepository consignRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /**
     * testConsignPoroject
     * 测试过程
     * <ol>
     *  <li>新建委托</li>
     *  <li>查找委托</li>
     *  <li>删除委托</li>
     *  <li>确认是否删除</li>
     * </ol>
     * 测试结果
     * <ol>
     *     <li>查找委托时，不为空</li>
     *     <li></li>
     * </ol>
     */
    @Test
    public void testConsignProject() {
        Consign consign = new Consign();

        consign.setId("1");


        Project project = projectRepository.findById("test");
        project.setConsign(consign);
        consign.setProject(project);
        consignRepository.save(consign);
        projectRepository.save(project);


        Consign consignfind = consignRepository.findById("1");

        Assert.assertNotNull("consign为空",consignfind);

        consignRepository.delete("1");

        consignfind = consignRepository.findById("1");

        Assert.assertNull("consign不为空",consignfind);


    }
}