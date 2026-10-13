export async function POST(request: Request) {
  const { notes, documentType } = await request.json();

  let result = "";

  if (documentType === "care-plan") {
    result = `
CARE PLAN

Summary
The individual would like to increase independence.

Support Needs
• Budgeting support
• Travel planning

Goals
• Independent travel
• Community engagement

Recommendations
• Create support plan

Original Notes

${notes}
`;
  }

  if (documentType === "review-summary") {
    result = `
REVIEW SUMMARY

Progress

The individual continues to work towards greater independence.

Achievements

• Community participation
• Personal development

Next Steps

• Continue support

Original Notes

${notes}
`;
  }

  if (documentType === "risk-assessment") {
    result = `
RISK ASSESSMENT

Identified Risks

• Financial management
• Independent travel

Current Controls

• Support worker guidance

Recommendations

• Budget reviews
• Travel planning

Original Notes

${notes}
`;
  }

  if (documentType === "meeting-notes") {
    result = `
MEETING SUMMARY

Discussion

${notes}

Actions

• Follow up on goals
• Review progress

Owners

• Assigned support team

Review Date

• To be agreed
`;
  }

  return Response.json({
    result,
  });
}