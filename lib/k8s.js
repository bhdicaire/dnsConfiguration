// @ts-check
/// <reference path="types-dnscontrol.d.ts" />

function MAIN_K8S(name) {
    return [
        A(name, "65.21.116.72"),
        //AAAA(name, "2a01:4f9:4a:451c:1000::1")
    ];
}

function CP2_K8S(name) {
    return [
        A(name, "65.109.5.159"),
        AAAA(name, "2a01:4f9:c012:550::1")
    ]
}

function CP3_K8S(name) {
    return [
        A(name, "37.27.7.20"),
        AAAA(name, "2a01:4f9:c012:3124::1")
    ]
}

function K8S(name) {
    return [
        MAIN_K8S(name),
        CP2_K8S(name),
        CP3_K8S(name)
    ]
}

function MAIN_K8S_ADMIN(name) {
    return [
        A(name, "95.217.202.35"),
        AAAA(name, "2a01:4f9:4a:451c:2::5")
    ];
}

function CP2_K8S_ADMIN(name) {
    return [
        A(name, "65.109.5.159"),
        AAAA(name, "2a01:4f9:c012:550::1")
    ]
}

function CP3_K8S_ADMIN(name) {
    return [
        A(name, "37.27.7.20"),
        AAAA(name, "2a01:4f9:c012:3124::1")
    ]
}

function K8S_ADMIN(name) {
    return [
        MAIN_K8S_ADMIN(name),
        CP2_K8S_ADMIN(name),
        CP3_K8S_ADMIN(name)
    ]
}
