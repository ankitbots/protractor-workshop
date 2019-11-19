
Feature: Test YYY Scenario 
     
    @DeclarativeStyle 
    Scenario: Demo scenario to test YYY workflow - Declarative Style (Mix)
        Given Login to intranet
        When User navigates to "Feature_Channel_Overview"
        When User select a feature "ACCESSORIST " has value "2" and used in "3343" country channels 
        When User click feature value "YES " 
        Then User verify feature value "YES (FVID 472902)" and feature "ACCESSORIST (FID 66238)"
        Then User search with Wincos Code "3156" and verify conditions not fulfilled in country channels count as "26" 
     
    @ImperativeStyle
    Scenario: Demo scenario to test YYY workflow - Imperative Style
        Given Login to intranet
        When User click "btnMDM"
        When User click "btnShop"
        Then Verify "shopPage" is displaying
        When User click "btnFeatureChannelOverview"
        Then Verify "featureChannelOverviewPage" is displaying
        Then Switch To iFrame "sectionFeatureOverview"
        When User click "liFeatureItem" value "ACCESSORIST " item
        #Then Wait "5000"
        Then Verify "lstFeatureValue" has "2" items
        When User click "btnFeatureValueList" value "YES " item
        
        

        

