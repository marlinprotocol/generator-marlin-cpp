get_filename_component(<%- name_upper %>_CMAKE_DIR "${CMAKE_CURRENT_LIST_FILE}" PATH)
include(CMakeFindDependencyMacro)

list(APPEND CMAKE_MODULE_PATH ${<%- name_upper %>_CMAKE_DIR})

# find_package(MarlinTest CONFIG REQUIRED COMPONENTS test
# 	NAMES "Marlin" CONFIGS "MarlinTestConfig.cmake")

list(REMOVE_AT CMAKE_MODULE_PATH -1)

if(NOT TARGET Marlin::<%- name_lower %>)
    include("${<%- name_upper %>_CMAKE_DIR}/Marlin<%- name_title %>Targets.cmake")
endif()
