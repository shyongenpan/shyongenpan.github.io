# Running tests for Visibility tool

## Sections
* [Introduction](#introduction)
* [Requirements](#requirements)
	* [For ArcGIS Pro](#for-arcgis-pro)
	* [For ArcGIS Desktop](#for-arcgis-desktop)
* [Running the tests](#running-the-tests)
* [Log files](#log-files)
* [Reporting errors as Issues](#reporting-errors-as-issues)
* [What is being tested](#what-is-being-tested)

##Introduction
The unittests in this section of the repository are designed to test the geoprocessing tools contained within to make sure they are running consistently under different conditions. Automated testing, unittests are one type, help reduce the amount of time necessary to find defects or confirm their success. An automated test can run all of the tools in a significantly shorter amount of time than several people testing the tools manually. This should not be taken as an opportunity to skip other types of testing (ad-hoc, defect verification, template testing, system testing, etc.).

##Requirements
###For ArcGIS Desktop
Tools for ArcMap are in the **Military_Tools_arcmap.tbx** toolbox and have the following requirements:
* ArcGIS for Desktop 10.3.1+
* Python 2.7+

##Running the tests
The goal is to run the test suites for all of the tools against different versions of operating systems and versions of Python/ArcGIS.

1. Check your ArcGIS versions. You need to have at least ONE of two required versions listed above.
2. Modify the **.bat**.
	1.  [**TestKickStart.bat** ](./TestKickStart.bat)to run tests
3. Open a command prompt in *.\solutions-webappbuilder-widgets\Visibility\gpservices\Viewshed\tests*.
5. Check the dialog for results and check the log file created by the tests.

##Log files
The output from running the tests are stored in the *.\solutions-webappbuilder-widgets\Visibility\gpservices\Viewshed\tests\log* folder. The files are named:

     MTGT_YYYY-Month-DD_HH-MM-SS_seqX.log

where:

* YYYY - Four digit year
* Month - American English name of month
* DD - Two digit day of the month (01 - 31)
* HH - Two digit hour of the day in 24-hour format (00 - 23)
* MM - Two digit minute of the hour (00 - 59)
* SS - Two digit second of the minute (00 - 59)
* X - sequence number, if for reason two log files are created in the same exact second. Unlikely, but just in case.

For example:

    MTGT_2016-November-05_08-31-22_seq0.log

This log file was created November 5th, 2016 at 8:31:22 AM and was the first log file created at that time.

##Reporting errors as Issues
Any errors or problems need to be reported. If they go unmentioned, then they go unfixed. All issues should be logged in the military-tools-geoprocessing-repository [Issues](https://github.com/Esri/military-tools-geoprocessing-toolbox/issues).

1. First you should check the existing Issues to see if there is one already logged for the issue you found. If you find one that is the same or similar, please add a comment to it with the information in step 4 below.
2. Check the information you've collected. Make sure you've got a clear idea of what is happening, what you expected, and how the tool is expected to work.
3. Start a new issue and include the following information.
	1. Add a good description of the problem. It should answer:
		1. What tool were you using, what inputs did you use (be specific)?
		2. What happened?
		3. What did you expect to happen?
	2. Numbered steps to reproduce the problem
	3. Add a copy of the full error message
	4. Include a copy of the log file
5. Assign to the repository owner.


##What is being tested
So what is being tested for the tools in this toolbox? Below is a list of the type of questions
that the tool tests are answering.

### All tools
* Does the tool run?
* Is the output created (does it actually exist where it says it should)?
* Do all of the input parameters work?
* Do the tools work with different output spatial references?

### Visibility
**Point on DEM dataset**
* Is the point on the DEM?
