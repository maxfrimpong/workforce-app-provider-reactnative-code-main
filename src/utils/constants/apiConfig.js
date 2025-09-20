const apiConfig = {

    /******* Auth *******/
    register: 'driver/register',
    checkNumber: 'driver/login',
    login: 'driver/password',
    newPassword: 'driver/resetpassword',
    updateProfile: 'driver/updateprofile',
    uploadDP: 'driver/profileimage',
    changePassword: 'driver/changepassword',
    tradeArea: 'category/allsubcategory',
    region: 'admin/getAdminAddedRegions',
    getProfile: 'driver/profile',
    logout: 'driver/logout',

    /********* OTP verifcation **********/
    sendOtp: 'driver/resendotp',
    verifyOtp: 'driver/verifyotp',

    /******* Home *******/
    adminData: 'adminSetting/getBasicSettingInfo',
    getRequest: 'trip/driver/jobRequestListing',
    providerStatus: 'driver/onlineoffline',
    placeBid: 'trip/driver/placeBid',
    requestDetails: 'trip/tripdetails/',

    /******* job *******/
    bidPlaced: 'trip/driver/bidListing',
    bidMatched: 'trip/driver/getDriverMatchedJobs',
    makePayment: 'trip/driver/driverMakePayment',
    jobDetails: 'trip/tripdetails/',
    rateService: 'trip/feedbackcustomer',

    /******* Get Chat *******/
    getChat: 'driver/chathistory',
    uploadMedia: 'adminSetting/uploadMedia',

    /******* Settings & Help *******/
    today: 'stats/driver/today/',
    week: 'stats/driver/week/',

    /******* Settings & Help *******/
    support: 'driver/support',
    aboutUs: 'admin/aboutus',
    privacyPolicy: 'admin/privacypolicy',
    terms: 'admin/termsandconditions',
    faq: 'admin/helpandsupport',

    /******* Payment *******/
    addEmergency: 'driver/addcontact',
    getEmergency: 'driver/getcontact',
    removeEmergency: 'driver/removecontact',

    /******* Payment *******/
    addCard: 'payment/addpos',
    getCards: 'payment/poslist',
    removeCard: 'payment/deletepos',
    paypal: 'paypal'
}

export const apiSuccess = 'success'
export const apiFailure = 'failure'

export default apiConfig