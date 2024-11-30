package com.quickcheck.organization.joinCode;

import com.quickcheck.exception.InvalidAccessCodeException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.OrganizationDao;
import com.quickcheck.user.UserDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class OrganizationJoinCodeService {

    private final OrganizationJoinCodeDao organizationJoinCodeDao;
    private final OrganizationDao organizationDao;
    private final UserDao userDao;
    private final OrganizationJoinCodeResponseMapper organizationJoinCodeResponseMapper;

    public OrganizationJoinCodeService(OrganizationJoinCodeDao organizationJoinCodeDao, OrganizationDao organizationDao, UserDao userDao, OrganizationJoinCodeResponseMapper organizationJoinCodeResponseMapper) {
        this.organizationJoinCodeDao = organizationJoinCodeDao;
        this.organizationDao = organizationDao;
        this.userDao = userDao;
        this.organizationJoinCodeResponseMapper = organizationJoinCodeResponseMapper;
    }

    private void checkIfOrganizationJoinCodeExists(Integer organizationJoinCodeId) {
        if (!organizationJoinCodeDao.existOrganizationJoinCodeById(organizationJoinCodeId)) {
            throw new ResourceNotFoundException("No OrganizationJoinCode found with id %s".formatted(organizationJoinCodeId));
        }
    }

    private void checkIfOrganizationExists(Integer organizationId) {
        if (!organizationDao.existOrganizationById(organizationId)) {
            throw new ResourceNotFoundException("No Organization found with id %s".formatted(organizationId));
        }
    }

    private void checkIfUserExists(Integer userId) {
        if (!userDao.existUserById(userId)) {
            throw new ResourceNotFoundException("No User found with id %s".formatted(userId));
        }
    }

    public void checkIfOrganizationJoinCodeExistsByCode(Integer code){
        if (!organizationJoinCodeDao.existOrganizationJoinCodeByCode(code)){
            throw new ResourceNotFoundException("OrganizationJoinCode with code [%s] not found".formatted(code));
        }
    }

    public List<OrganizationJoinCode> getAllJoinCodeFromOrganization(Integer organizationId){
        checkIfOrganizationExists(organizationId);
        return organizationJoinCodeDao.selectAllOrganizationJoinCodeFromOrganization(organizationId);
    }

    public OrganizationJoinCode getOrganizationJoinCode(Integer organizationJoinCodeId) {
        checkIfOrganizationJoinCodeExists(organizationJoinCodeId);
        OrganizationJoinCode organizationJoinCode = organizationJoinCodeDao.selectOrganizationJoinCodeById(organizationJoinCodeId).get();
        return organizationJoinCode;
    }

    public Integer createOrganizationJoinCode(OrganizationJoinCodeRegistrationRequest request) {

        checkIfOrganizationExists(request.organizationId());
        checkIfUserExists(request.creatorId());

        Random random = new Random();
        boolean validCode = false;
        Integer code = 10000000 + random.nextInt(90000000);
        while (!validCode) {
            code = 10000000 + random.nextInt(90000000);
            if (!organizationJoinCodeDao.existOrganizationJoinCodeByCode(code)) {
                validCode = true;
            }
        }
        OrganizationJoinCode organizationJoinCode = new OrganizationJoinCode(
                code,
                request.organizationId(),
                request.usageLimit(),
                request.creatorId()
        );
        organizationJoinCodeDao.insertOrganizationJoinCode(organizationJoinCode);
        return code;
    }

    public void updateOrganizationJoinCode(Integer organizationJoinCodeId, OrganizationJoinCodeUpdateRequest update) {
        checkIfOrganizationJoinCodeExists(organizationJoinCodeId);

        OrganizationJoinCode organizationJoinCode = organizationJoinCodeDao.selectOrganizationJoinCodeById(organizationJoinCodeId).get();

        boolean changes = false;

        if (update.usageLimit()!=null && !update.usageLimit().equals(organizationJoinCode.getUsageLimit())){
            organizationJoinCode.setUsageLimit(update.usageLimit());
            changes=true;
        }

        if (!changes){
            throw new RuntimeException("No changes found");
        }

        organizationJoinCodeDao.updateOrganizationJoinCode(organizationJoinCodeId, organizationJoinCode);
    }

    public void deleteOrganizationJoinCode(Integer organizationJoinCodeId){
        checkIfOrganizationJoinCodeExists(organizationJoinCodeId);

        organizationJoinCodeDao.deleteOrganizationJoinCode(organizationJoinCodeId);
    }

    public OrganizationVerifyCodeResponse verifyJoinCode(Integer code){
        checkIfOrganizationJoinCodeExistsByCode(code);

        OrganizationJoinCode organizationJoinCode = organizationJoinCodeDao.selectOrganizationJoinCodeByCode(code).get();

        if (organizationJoinCode.getUsageLimit()==0){
            throw new InvalidAccessCodeException("Code usage limit reached");
        }

        return organizationJoinCodeDao.selectOrganizationJoinCodeByCode(code)
                .map(organizationJoinCodeResponseMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "OrganizationJoinCode with code [%s] not found".formatted(code)
                ));
    }

    public void decrementCodeUsageLimit(Integer code){
        checkIfOrganizationJoinCodeExistsByCode(code);
        OrganizationJoinCode organizationJoinCode = organizationJoinCodeDao.selectOrganizationJoinCodeByCode(code).get();

        Integer newUsageLimit = organizationJoinCode.getUsageLimit()-1;

        organizationJoinCode.setUsageLimit(newUsageLimit);

        organizationJoinCodeDao.updateOrganizationJoinCode(organizationJoinCode.getId(),organizationJoinCode);
    }
}
