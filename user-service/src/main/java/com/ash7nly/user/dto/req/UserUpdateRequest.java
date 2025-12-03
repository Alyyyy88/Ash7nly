package com.ash7nly.user.dto.req;

public class UserUpdateRequest {
    private String fullName;
    private String phoneNumber;

    public UserUpdateRequest() {
    }

    public UserUpdateRequest(String fullName, String phoneNumber) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
    }

    public static UserUpdateRequestBuilder builder() {
        return new UserUpdateRequestBuilder();
    }

    public static class UserUpdateRequestBuilder {
        private String fullName;
        private String phoneNumber;

        public UserUpdateRequestBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public UserUpdateRequestBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserUpdateRequest build() {
            return new UserUpdateRequest(fullName, phoneNumber);
        }
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

