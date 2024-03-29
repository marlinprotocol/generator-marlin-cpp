cmake_minimum_required(VERSION 3.9)
project(<%- name_lower %> VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Werror -Wall -Wextra -pedantic-errors")

include(GNUInstallDirs)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_LIST_DIR}/cmake")

add_library(<%- name_lower %> STATIC

)

target_include_directories(<%- name_lower %>
	PUBLIC
		$<INSTALL_INTERFACE:include/marlin/<%- name_lower %>>
		$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
	PRIVATE
		${CMAKE_CURRENT_SOURCE_DIR}/src
)

set_target_properties(<%- name_lower %> PROPERTIES
	OUTPUT_NAME "marlin-<%- name_lower %>"
)

# find_package(MarlinTest CONFIG REQUIRED COMPONENTS test
# 	NAMES "Marlin" CONFIGS "MarlinTestConfig.cmake")

# target_link_libraries(<%- name_lower %> PUBLIC Marlin::test)

find_package(spdlog REQUIRED)

install(TARGETS <%- name_lower %>
	EXPORT marlin-<%- name_lower %>-export
	LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
	ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
)

install(DIRECTORY include/ DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/marlin/<%- name_lower %>)

##########################################################
# Export
##########################################################

install(EXPORT marlin-<%- name_lower %>-export
  FILE
	Marlin<%- name_title %>Targets.cmake
  NAMESPACE
	Marlin::
  DESTINATION
	${CMAKE_INSTALL_LIBDIR}/cmake/Marlin
)

install(FILES
	${CMAKE_CURRENT_LIST_DIR}/cmake/Marlin<%- name_title %>Config.cmake
	DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/Marlin
)
