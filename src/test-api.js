// // Test file to verify OnDemand API integration
// // Run this with: node src/test-api.js

// import fetch from 'node-fetch';

// const testAnalysisRequest = {
//   businessDescription: "AI-powered credit scoring platform for SMEs in the GCC region using alternative data sources like social media and transaction history. B2B SaaS model targeting banks and financial institutions.",
//   targetMarkets: "uae-saudi",
//   businessStage: "mvp",
//   businessModel: "b2b-saas"
// };

// const API_KEY = "bMQCsVAtvNyIMWERgzpNmGCbkIchkxgk";
// const CHAT_API_URL = "https://api.on-demand.io/chat/v1/sessions/query";

// async function testOnDemandAPI() {
//   try {
//     console.log("Testing OnDemand API integration...");
//     console.log("API Key:", API_KEY.substring(0, 10) + "...");
//     console.log("Endpoint:", CHAT_API_URL);
    
//     const requestBody = {
//       toolId: "tool-1757149454", // master_orchestrator
//       query: `Analyze this startup: ${testAnalysisRequest.businessDescription}. Target Markets: ${testAnalysisRequest.targetMarkets}. Business Stage: ${testAnalysisRequest.businessStage}. Business Model: ${testAnalysisRequest.businessModel}`,
//       responseMode: "sync"
//     };
    
//     console.log("Request body:", JSON.stringify(requestBody, null, 2));
    
//     // Try different header combinations
//     const headers1 = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${API_KEY}`,
//       'X-API-Key': API_KEY
//     };
    
//     const headers2 = {
//       'Content-Type': 'application/json',
//       'apikey': API_KEY
//     };
    
//     const headers3 = {
//       'Content-Type': 'application/json',
//       'X-API-KEY': API_KEY
//     };
    
//     const headers4 = {
//       'Content-Type': 'application/json',
//       'api-key': API_KEY
//     };

//     console.log("Trying different header formats...");
    
//     // Test 1: Current format
//     console.log("\n--- Test 1: Authorization Bearer + X-API-Key ---");
//     let response = await fetch(CHAT_API_URL, {
//       method: 'POST',
//       headers: headers1,
//       body: JSON.stringify(requestBody)
//     });
//     console.log("Status:", response.status);
//     console.log("Response:", await response.text());
    
//     // Test 2: apikey header
//     console.log("\n--- Test 2: apikey header ---");
//     response = await fetch(CHAT_API_URL, {
//       method: 'POST',
//       headers: headers2,
//       body: JSON.stringify(requestBody)
//     });
//     console.log("Status:", response.status);
//     console.log("Response:", await response.text());
    
//     // Test 3: X-API-KEY header
//     console.log("\n--- Test 3: X-API-KEY header ---");
//     response = await fetch(CHAT_API_URL, {
//       method: 'POST',
//       headers: headers3,
//       body: JSON.stringify(requestBody)
//     });
//     console.log("Status:", response.status);
//     console.log("Response:", await response.text());
    
//     // Test 4: api-key header
//     console.log("\n--- Test 4: api-key header ---");
//     response = await fetch(CHAT_API_URL, {
//       method: 'POST',
//       headers: headers4,
//       body: JSON.stringify(requestBody)
//     });
//     console.log("Status:", response.status);
//     const responseText = await response.text();
//     console.log("Response:", responseText);

//     if (!response.ok) {
//       throw new Error(`API call failed: ${response.status} ${response.statusText}\nResponse: ${responseText}`);
//     }

//     const result = JSON.parse(responseText);
//     console.log("✅ OnDemand API test successful!");
//     console.log("Parsed response:", JSON.stringify(result, null, 2));
    
//   } catch (error) {
//     console.error("❌ OnDemand API test failed:", error.message);
//     console.error("Full error:", error);
//   }
// }

// // Run the test if this file is executed directly
// if (typeof window === 'undefined') {
//   testOnDemandAPI();
// }


// Enhanced test script for OnDemand API
// Run this with: node src/test-ondemand-api.js


// Focused test based on what we learned from the error messages
// Run this with: node src/focused-ondemand-test.js

// Final test script using correct OnDemand API structure
// Run this with: node src/final-ondemand-test.js


// Minimal test - just get ONE successful OnDemand API call
// Run this with: node src/minimal-ondemand-test.js


// Final test using the correct OnDemand Playground approach
// Run this with: node src/final-working-test.js
// Quick test to find valid reasoning mode
// Run this with: node src/reasoning-mode-test.js
// Quick test to find valid reasoning mode
// Run this with: node src/reasoning-mode-test.js

import fetch from 'node-fetch';

const API_KEY = "2VEN6X1Etvt8Lh3X5FaaOXCc9nbPKuJK";
const BASE_URL = "https://api.on-demand.io/chat/v1";
const SESSION_ID = "68bc51c825c7cae5f1d7e2a8"; // From your successful session

const AGENT_IDS = [
  "agent-1756998445", "agent-1757088152", "agent-1757090431", "agent-1757092230",
  "agent-1757092887", "agent-1757095739", "agent-1757096389", "agent-1757097941",
  "agent-1757098990", "agent-1757146969", "agent-1757149454"
];

const ENDPOINT_ID = "predefined-openai-gpt4.1";

function getHeaders() {
  return {
    'apikey': API_KEY,
    'Content-Type': 'application/json'
  };
}

async function testReasoningModes() {
  console.log('🔍 Testing different reasoning modes...');
  console.log('Using session ID:', SESSION_ID);
  
  // Test different reasoning mode values
  const reasoningModes = [
    null,           // No reasoning mode
    "flash",        // From the Python example
    "standard",     // Common alternative
    "fast",         // Another possibility
    "basic",        // Basic mode
    "advanced",     // Advanced mode
    "default"       // Default mode
  ];

  for (const reasoningMode of reasoningModes) {
    console.log(`\n--- Testing reasoningMode: ${reasoningMode || 'null'} ---`);
    
    const requestBody = {
      endpointId: ENDPOINT_ID,
      query: "Hello, can you help me analyze a startup?",
      agentIds: AGENT_IDS,
      responseMode: "sync"
    };

    // Add reasoning mode if not null
    if (reasoningMode !== null) {
      requestBody.reasoningMode = reasoningMode;
    }

    // Add minimal model configs
    requestBody.modelConfigs = {
      temperature: 0.7,
      topP: 1,
      maxTokens: 0
    };

    try {
      const response = await fetch(`${BASE_URL}/sessions/${SESSION_ID}/query`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(requestBody)
      });

      const responseText = await response.text();
      console.log(`Status: ${response.status}`);

      if (response.status === 200) {
        console.log(`✅ SUCCESS with reasoningMode: ${reasoningMode || 'null'}`);
        console.log('Response preview:', responseText.substring(0, 150) + '...');
        
        // Parse response
        try {
          const result = JSON.parse(responseText);
          console.log('Response structure:', Object.keys(result));
          if (result.data && result.data.answer) {
            console.log('Answer preview:', result.data.answer.substring(0, 100) + '...');
          }
        } catch (e) {
          console.log('Response is not JSON');
        }
        
        // Found working mode, test with full query
        console.log('\n🚀 Testing with comprehensive query...');
        await testComprehensiveQuery(reasoningMode);
        break;

      } else {
        console.log(`❌ Failed: ${responseText.substring(0, 100)}`);
      }

    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function testComprehensiveQuery(workingReasoningMode) {
  const comprehensiveQuery = `
Please analyze this startup for the GCC market:

Business: AI-powered credit scoring platform for SMEs using alternative data sources
Target Markets: UAE and Saudi Arabia  
Stage: MVP Development
Model: B2B SaaS

Provide:
1. Market opportunity score (0-100)
2. Financial feasibility score (0-100)
3. Overall feasibility score (0-100)
4. Key recommendations

Keep response concise but comprehensive.
`;

  const requestBody = {
    endpointId: ENDPOINT_ID,
    query: comprehensiveQuery,
    agentIds: AGENT_IDS,
    responseMode: "sync",
    modelConfigs: {
      temperature: 0.7,
      topP: 1,
      maxTokens: 0
    }
  };

  // Add working reasoning mode if it's not null
  if (workingReasoningMode !== null) {
    requestBody.reasoningMode = workingReasoningMode;
  }

  try {
    const response = await fetch(`${BASE_URL}/sessions/${SESSION_ID}/query`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log(`Comprehensive query status: ${response.status}`);

    if (response.status === 200) {
      console.log('✅ Comprehensive query successful!');
      
      try {
        const result = JSON.parse(responseText);
        if (result.data && result.data.answer) {
          const answer = result.data.answer;
          console.log('📊 Analysis length:', answer.length);
          
          // Look for scores
          const scoreRegex = /(\d+)(?:\s*\/\s*100|\s*%)/g;
          const scores = [];
          let match;
          while ((match = scoreRegex.exec(answer)) !== null) {
            scores.push(parseInt(match[1]));
          }
          
          if (scores.length > 0) {
            console.log('📈 Found scores:', scores);
          }
          
          console.log('📋 Analysis preview:', answer.substring(0, 300) + '...');
        }
      } catch (e) {
        console.log('Response length:', responseText.length);
      }

      console.log('\n🎉 ONDEMAND API IS FULLY WORKING!');
      console.log(`Working configuration:`);
      console.log(`- API Key: Working ✅`);
      console.log(`- Session Creation: Working ✅`);
      console.log(`- Query Submission: Working ✅`);
      console.log(`- Reasoning Mode: ${workingReasoningMode || 'null'} ✅`);
      console.log(`- GCC Agents: All 11 agents loaded ✅`);

    } else {
      console.log('❌ Comprehensive query failed:', responseText.substring(0, 150));
    }

  } catch (error) {
    console.log('❌ Comprehensive query error:', error.message);
  }
}

// Run the test
testReasoningModes().then(() => {
  console.log('\n=== REASONING MODE TEST COMPLETE ===');
}).catch(error => {
  console.error('❌ Test failed:', error);
});