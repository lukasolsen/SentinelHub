import Report, { IReport } from "../models/Report";
import { Types } from "mongoose";

// Create a new report
const CreateReport = async (report: IReport): Promise<IReport> => {
  try {
    const newReport = new Report(report);
    const savedReport = await newReport.save();
    return savedReport;
  } catch (error) {
    throw new Error("Unable to create a new report.");
  }
};

// Retrieve a report by ID
const FindReport = async (reportId: string): Promise<IReport | null> => {
  try {
    console.log(reportId);
    const report = await Report.findOne({ reportId: reportId }).lean();
    console.log(report);
    return report;
  } catch (error) {
    console.log(error);
    //throw new Error("Unable to find the report.");
  }
};

// List all reports
const ListReports = async (): Promise<IReport[]> => {
  try {
    //each report has a list of
    const reports = await Report.find().lean();
    return reports;
  } catch (error) {
    throw new Error("Unable to list reports.");
  }
};

// Update a report by ID
const UpdateReport = async (
  reportId: string,
  updatedReport: IReport
): Promise<IReport | null> => {
  try {
    const updated = await Report.findByIdAndUpdate(reportId, updatedReport, {
      new: true,
    });
    return updated;
  } catch (error) {
    throw new Error("Unable to update the report.");
  }
};

// Delete a report by ID
const DeleteReport = async (reportId: string): Promise<boolean> => {
  try {
    await Report.findByIdAndDelete(reportId);
    return true;
  } catch (error) {
    throw new Error("Unable to delete the report.");
  }
};

export { CreateReport, FindReport, ListReports, UpdateReport, DeleteReport };
