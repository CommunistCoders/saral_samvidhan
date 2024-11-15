using UnityEngine;
using TMPro;
using System;
public class DriverUI : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    public TMP_Text buildingCollisionstext;
    public TMP_Text trafficViolationstext;

    public TMP_Text cargo;
    public CarMovement carMovement;
    public CheckPointSystem checkPointSystem;
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        buildingCollisionstext.text = Convert.ToString(carMovement.buildingCollisions);
        trafficViolationstext.text = Convert.ToString(checkPointSystem.trafficViolations);
        cargo.text = Convert.ToString(carMovement.cargo) + "/150";
    }
}
